"use client"

import { useRef, useEffect, useState, useCallback } from "react"

/* ------------------------------------------------------------------ *
 * CAREER RACER '85 — a pure front-end pseudo-3D arcade racer.
 * Out Run-style: race the clock, pass checkpoints to extend time.
 * Rendering technique: classic projected road segments (Lou's Pseudo-3D).
 * ------------------------------------------------------------------ */

// --- internal render resolution (scaled by CSS) ---
const WIDTH = 640
const HEIGHT = 400

// --- road / camera constants ---
const SEG_LENGTH = 200
const RUMBLE_LENGTH = 3
const ROAD_WIDTH = 2000
const LANES = 3
const FOV = 100
const CAMERA_HEIGHT = 1000
const DRAW_DISTANCE = 220
const FOG_DENSITY = 5
const CENTRIFUGAL = 0.3
const CAMERA_DEPTH = 1 / Math.tan(((FOV / 2) * Math.PI) / 180)
const PLAYER_Z = CAMERA_HEIGHT * CAMERA_DEPTH

// --- physics ---
const MAX_SPEED = SEG_LENGTH / (1 / 60) // 12000 units/s
const ACCEL = MAX_SPEED / 5
const BRAKING = -MAX_SPEED
const DECEL = -MAX_SPEED / 5
const OFFROAD_DECEL = -MAX_SPEED / 2
const OFFROAD_LIMIT = MAX_SPEED / 4

// --- game rules ---
const START_TIME = 45
const CHECKPOINT_BONUS = 16
const CHECKPOINT_INTERVAL = 26000 // distance units between checkpoints
const HIGHSCORE_KEY = "career-racer:highscore"

const FOG_COLOR = "#0a0612"
const CAR_COLORS = ["#FF4136", "#FF851B", "#B10DC9", "#2ECC40", "#39CCCC", "#F012BE"]

const COLORS = {
  LIGHT: { road: "#2b2b33", grass: "#0e0e09", rumble: "#FFD700", lane: "#e9e9e9" },
  DARK: { road: "#26262d", grass: "#0a0a06", rumble: "#FF8C00", lane: "" },
  START: { road: "#cfcfcf", grass: "#cfcfcf", rumble: "#cfcfcf", lane: "" },
}

// ------------------------- types -------------------------
type ScreenPt = {
  world: { x?: number; y: number; z: number }
  camera: { x: number; y: number; z: number }
  screen: { x: number; y: number; w: number; scale: number }
}
type TrafficCar = { offset: number; z: number; speed: number; color: string; percent: number }
type Segment = {
  index: number
  p1: ScreenPt
  p2: ScreenPt
  curve: number
  color: typeof COLORS.LIGHT
  cars: TrafficCar[]
  clip: number
  looped: boolean
  fog: number
}
type Sim = {
  segments: Segment[]
  trackLength: number
  position: number
  playerX: number
  speed: number
  totalDistance: number
  timeLeft: number
  score: number
  high: number
  nextCheckpoint: number
  checkpointCount: number
  bg: number
}
type Phase = "ready" | "playing" | "over"

// ------------------------- math helpers -------------------------
const interpolate = (a: number, b: number, p: number) => a + (b - a) * p
const easeIn = (a: number, b: number, p: number) => a + (b - a) * Math.pow(p, 2)
const easeInOut = (a: number, b: number, p: number) => a + (b - a) * (-Math.cos(p * Math.PI) / 2 + 0.5)
const exponentialFog = (d: number, density: number) => 1 / Math.pow(Math.E, d * d * density)
const limit = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(v, hi))
const accelerate = (v: number, accel: number, dt: number) => v + accel * dt
const percentRemaining = (n: number, total: number) => ((n % total) + total) % total / total
function increase(start: number, inc: number, max: number) {
  let r = start + inc
  while (r >= max) r -= max
  while (r < 0) r += max
  return r
}
function overlap(x1: number, w1: number, x2: number, w2: number, pct = 1) {
  const half = pct / 2
  const min1 = x1 - w1 * half
  const max1 = x1 + w1 * half
  const min2 = x2 - w2 * half
  const max2 = x2 + w2 * half
  return !(max1 < min2 || min1 > max2)
}

// ------------------------- track building -------------------------
function lastY(segs: Segment[]) {
  return segs.length === 0 ? 0 : segs[segs.length - 1].p2.world.y
}
function addSegment(segs: Segment[], curve: number, y: number) {
  const n = segs.length
  segs.push({
    index: n,
    p1: { world: { y: lastY(segs), z: n * SEG_LENGTH }, camera: { x: 0, y: 0, z: 0 }, screen: { x: 0, y: 0, w: 0, scale: 0 } },
    p2: { world: { y, z: (n + 1) * SEG_LENGTH }, camera: { x: 0, y: 0, z: 0 }, screen: { x: 0, y: 0, w: 0, scale: 0 } },
    curve,
    color: Math.floor(n / RUMBLE_LENGTH) % 2 ? COLORS.DARK : COLORS.LIGHT,
    cars: [],
    clip: 0,
    looped: false,
    fog: 1,
  })
}
function addRoad(segs: Segment[], enter: number, hold: number, leave: number, curve: number, y: number) {
  const startY = lastY(segs)
  const endY = startY + y * SEG_LENGTH
  const total = enter + hold + leave
  for (let n = 0; n < enter; n++) addSegment(segs, easeIn(0, curve, n / enter), easeInOut(startY, endY, n / total))
  for (let n = 0; n < hold; n++) addSegment(segs, curve, easeInOut(startY, endY, (enter + n) / total))
  for (let n = 0; n < leave; n++) addSegment(segs, easeInOut(curve, 0, n / leave), easeInOut(startY, endY, (enter + hold + n) / total))
}
function buildTrack() {
  const segs: Segment[] = []
  const rnd = (a: number, b: number) => a + Math.random() * (b - a)
  const ri = (a: number, b: number) => Math.round(rnd(a, b))
  const curves = [-5, -4, -3, -2, 0, 0, 2, 3, 4, 5]
  const hills = [-50, -30, -15, 0, 0, 15, 30, 50, 70]

  addRoad(segs, 40, 40, 40, 0, 0) // flat straight start
  for (let i = 0; i < 26; i++) {
    addRoad(segs, ri(20, 45), ri(20, 45), ri(20, 45), curves[Math.floor(Math.random() * curves.length)], hills[Math.floor(Math.random() * hills.length)])
  }
  // ease height back toward 0 so the endless loop seam is smooth
  const fy = lastY(segs)
  addRoad(segs, 40, 40, 40, 0, -fy / SEG_LENGTH)

  for (let n = 0; n < RUMBLE_LENGTH * 2; n++) segs[n].color = COLORS.START

  return { segments: segs, trackLength: segs.length * SEG_LENGTH }
}
function findSegment(segs: Segment[], z: number) {
  return segs[Math.floor(z / SEG_LENGTH) % segs.length]
}
function seedCars(segs: Segment[]) {
  for (const s of segs) s.cars = []
  const total = Math.min(48, Math.floor(segs.length / 18))
  for (let i = 0; i < total; i++) {
    const offset = Math.random() * 1.6 - 0.8
    const z = Math.floor(Math.random() * segs.length) * SEG_LENGTH
    const speed = MAX_SPEED / 4 + Math.random() * (MAX_SPEED / 4)
    const color = CAR_COLORS[i % CAR_COLORS.length]
    findSegment(segs, z).cars.push({ offset, z, speed, color, percent: 0 })
  }
}

// ------------------------- projection -------------------------
function project(p: ScreenPt, camX: number, camY: number, camZ: number) {
  p.camera.x = (p.world.x || 0) - camX
  p.camera.y = p.world.y - camY
  p.camera.z = p.world.z - camZ
  p.screen.scale = CAMERA_DEPTH / p.camera.z
  p.screen.x = Math.round(WIDTH / 2 + (p.screen.scale * p.camera.x * WIDTH) / 2)
  p.screen.y = Math.round(HEIGHT / 2 - (p.screen.scale * p.camera.y * HEIGHT) / 2)
  p.screen.w = Math.round((p.screen.scale * ROAD_WIDTH * WIDTH) / 2)
}

// ------------------------- drawing -------------------------
function polygon(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineTo(x3, y3)
  ctx.lineTo(x4, y4)
  ctx.closePath()
  ctx.fill()
}
function drawPixelCar(ctx: CanvasRenderingContext2D, cx: number, bottomY: number, w: number, h: number, body: string) {
  const x = cx - w / 2
  const y = bottomY - h
  // shadow
  ctx.fillStyle = "rgba(0,0,0,0.4)"
  ctx.fillRect(x - w * 0.04, bottomY - h * 0.16, w * 1.08, h * 0.2)
  // wheels
  ctx.fillStyle = "#000"
  ctx.fillRect(x - w * 0.03, y + h * 0.6, w * 0.16, h * 0.34)
  ctx.fillRect(x + w * 0.87, y + h * 0.6, w * 0.16, h * 0.34)
  // body
  ctx.fillStyle = body
  ctx.fillRect(x, y + h * 0.34, w, h * 0.52)
  // cabin
  ctx.fillRect(x + w * 0.2, y, w * 0.6, h * 0.46)
  // window
  ctx.fillStyle = "#0c0c14"
  ctx.fillRect(x + w * 0.27, y + h * 0.07, w * 0.46, h * 0.3)
  // taillights
  ctx.fillStyle = "#FF2d2d"
  ctx.fillRect(x + w * 0.04, y + h * 0.5, w * 0.13, h * 0.14)
  ctx.fillRect(x + w * 0.83, y + h * 0.5, w * 0.13, h * 0.14)
}

function drawBackground(ctx: CanvasRenderingContext2D, sim: Sim) {
  // sunset gradient
  const g = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  g.addColorStop(0, "#160a2e")
  g.addColorStop(0.45, "#5b1d77")
  g.addColorStop(0.7, "#c2410c")
  g.addColorStop(1, "#fb923c")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const horizon = HEIGHT / 2
  const sunX = WIDTH / 2 - sim.bg * 0.6
  const sunY = horizon - 46
  // Out Run sun
  ctx.save()
  ctx.beginPath()
  ctx.arc(sunX, sunY, 58, 0, Math.PI * 2)
  ctx.clip()
  const sg = ctx.createLinearGradient(0, sunY - 58, 0, sunY + 58)
  sg.addColorStop(0, "#FFE066")
  sg.addColorStop(1, "#FF4d6d")
  ctx.fillStyle = sg
  ctx.fillRect(sunX - 58, sunY - 58, 116, 116)
  // horizontal slats
  ctx.fillStyle = "#160a2e"
  for (let i = 0; i < 7; i++) ctx.fillRect(sunX - 58, sunY + 8 + i * 9, 116, 4)
  ctx.restore()

  // distant mountain silhouette
  ctx.fillStyle = "#1c0f33"
  ctx.beginPath()
  ctx.moveTo(0, horizon)
  const off = (sim.bg * 0.4) % 160
  for (let x = -160; x <= WIDTH + 160; x += 160) {
    ctx.lineTo(x - off + 40, horizon - 34)
    ctx.lineTo(x - off + 80, horizon)
    ctx.lineTo(x - off + 120, horizon - 20)
    ctx.lineTo(x - off + 160, horizon)
  }
  ctx.lineTo(WIDTH, horizon)
  ctx.closePath()
  ctx.fill()
}

function renderSegment(ctx: CanvasRenderingContext2D, seg: Segment) {
  const { p1, p2, color } = seg
  const x1 = p1.screen.x, y1 = p1.screen.y, w1 = p1.screen.w
  const x2 = p2.screen.x, y2 = p2.screen.y, w2 = p2.screen.w
  // grass
  ctx.fillStyle = color.grass
  ctx.fillRect(0, y2, WIDTH, y1 - y2)
  // rumble strips
  const r1 = w1 / 6, r2 = w2 / 6
  polygon(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble)
  polygon(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble)
  // road
  polygon(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road)
  // lane markers (only on light segments → dashed effect)
  if (color.lane) {
    const l1 = w1 / 32, l2 = w2 / 32
    const lw1 = (w1 * 2) / LANES, lw2 = (w2 * 2) / LANES
    let lx1 = x1 - w1 + lw1, lx2 = x2 - w2 + lw2
    for (let lane = 1; lane < LANES; lane++) {
      polygon(ctx, lx1 - l1 / 2, y1, lx1 + l1 / 2, y1, lx2 + l2 / 2, y2, lx2 - l2 / 2, y2, color.lane)
      lx1 += lw1
      lx2 += lw2
    }
  }
  // fog into the distance
  if (seg.fog < 1) {
    ctx.globalAlpha = 1 - seg.fog
    ctx.fillStyle = FOG_COLOR
    ctx.fillRect(0, y2, WIDTH, y1 - y2)
    ctx.globalAlpha = 1
  }
}

// ------------------------- component -------------------------
export default function RetroRacecarGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simRef = useRef<Sim | null>(null)
  const keysRef = useRef({ left: false, right: false, up: false, down: false })
  const phaseRef = useRef<Phase>("ready")
  const rafRef = useRef<number>()
  const lastRef = useRef(0)
  const hudAccumRef = useRef(0)
  const shakeRef = useRef(0)
  const bannerExpiryRef = useRef(0)

  const [phase, setPhaseState] = useState<Phase>("ready")
  const [hud, setHud] = useState({ score: 0, high: 0, time: START_TIME, speed: 0, stage: 0 })
  const [banner, setBanner] = useState<{ stage: number } | null>(null)

  const setPhase = (p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
  }

  const resetSim = useCallback((rebuild: boolean) => {
    let sim = simRef.current
    if (!sim || rebuild) {
      const { segments, trackLength } = buildTrack()
      sim = {
        segments,
        trackLength,
        position: 0,
        playerX: 0,
        speed: 0,
        totalDistance: 0,
        timeLeft: START_TIME,
        score: 0,
        high: sim?.high ?? 0,
        nextCheckpoint: CHECKPOINT_INTERVAL,
        checkpointCount: 0,
        bg: 0,
      }
      simRef.current = sim
    }
    seedCars(sim.segments)
    sim.position = 0
    sim.playerX = 0
    sim.speed = 0
    sim.totalDistance = 0
    sim.timeLeft = START_TIME
    sim.score = 0
    sim.nextCheckpoint = CHECKPOINT_INTERVAL
    sim.checkpointCount = 0
    sim.bg = 0
  }, [])

  // ----- update -----
  const update = useCallback((dt: number) => {
    const sim = simRef.current
    if (!sim) return
    const segs = sim.segments
    const playerSeg = findSegment(segs, sim.position + PLAYER_Z)
    const speedPct = sim.speed / MAX_SPEED
    const dx = dt * 2 * speedPct
    const keys = keysRef.current

    sim.position = increase(sim.position, dt * sim.speed, sim.trackLength)
    sim.bg += playerSeg.curve * speedPct * 12

    if (keys.left) sim.playerX -= dx
    else if (keys.right) sim.playerX += dx
    sim.playerX -= dx * speedPct * playerSeg.curve * CENTRIFUGAL

    if (keys.up) sim.speed = accelerate(sim.speed, ACCEL, dt)
    else if (keys.down) sim.speed = accelerate(sim.speed, BRAKING, dt)
    else sim.speed = accelerate(sim.speed, DECEL, dt)

    if ((sim.playerX < -1 || sim.playerX > 1) && sim.speed > OFFROAD_LIMIT) {
      sim.speed = accelerate(sim.speed, OFFROAD_DECEL, dt)
    }

    // traffic collision
    for (const car of playerSeg.cars) {
      if (sim.speed > car.speed && overlap(sim.playerX, 0.5, car.offset, 0.5, 0.8)) {
        sim.speed = car.speed * (car.speed / sim.speed)
        sim.position = increase(car.z, -PLAYER_Z, sim.trackLength)
        shakeRef.current = 8
        break
      }
    }

    sim.playerX = limit(sim.playerX, -2.2, 2.2)
    sim.speed = limit(sim.speed, 0, MAX_SPEED)

    // move traffic
    const all: TrafficCar[] = []
    for (const s of segs) {
      if (s.cars.length) {
        for (const c of s.cars) all.push(c)
        s.cars = []
      }
    }
    for (const c of all) {
      c.z = increase(c.z, dt * c.speed, sim.trackLength)
      c.percent = percentRemaining(c.z, SEG_LENGTH)
      findSegment(segs, c.z).cars.push(c)
    }

    // distance / score / time
    sim.totalDistance += dt * sim.speed
    sim.score = Math.floor(sim.totalDistance / 100)
    sim.timeLeft -= dt

    if (sim.totalDistance >= sim.nextCheckpoint) {
      sim.timeLeft += CHECKPOINT_BONUS
      sim.nextCheckpoint += CHECKPOINT_INTERVAL
      sim.checkpointCount++
      bannerExpiryRef.current = performance.now() + 2600
      setBanner({ stage: sim.checkpointCount })
    }

    if (sim.timeLeft <= 0) {
      sim.timeLeft = 0
      if (sim.score > sim.high) {
        sim.high = sim.score
        try {
          localStorage.setItem(HIGHSCORE_KEY, String(sim.high))
        } catch {}
      }
      setHud({ score: sim.score, high: sim.high, time: 0, speed: 0, stage: sim.checkpointCount })
      setPhase("over")
    }
  }, [])

  // ----- render -----
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const sim = simRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || !sim) return
    const segs = sim.segments

    ctx.save()
    if (shakeRef.current > 0.2) {
      ctx.translate((Math.random() - 0.5) * shakeRef.current, (Math.random() - 0.5) * shakeRef.current)
      shakeRef.current *= 0.85
    }

    drawBackground(ctx, sim)

    const baseSeg = findSegment(segs, sim.position)
    const basePercent = percentRemaining(sim.position, SEG_LENGTH)
    const playerSeg = findSegment(segs, sim.position + PLAYER_Z)
    const playerPercent = percentRemaining(sim.position + PLAYER_Z, SEG_LENGTH)
    const playerY = interpolate(playerSeg.p1.world.y, playerSeg.p2.world.y, playerPercent)

    let maxy = HEIGHT
    let x = 0
    let ddx = -(baseSeg.curve * basePercent)
    const camX = sim.playerX * ROAD_WIDTH
    const camY = CAMERA_HEIGHT + playerY

    for (let n = 0; n < DRAW_DISTANCE; n++) {
      const seg = segs[(baseSeg.index + n) % segs.length]
      seg.looped = seg.index < baseSeg.index
      seg.fog = exponentialFog(n / DRAW_DISTANCE, FOG_DENSITY)
      seg.clip = maxy
      const camZ = sim.position - (seg.looped ? sim.trackLength : 0)
      project(seg.p1, camX - x, camY, camZ)
      project(seg.p2, camX - x - ddx, camY, camZ)
      x += ddx
      ddx += seg.curve

      if (seg.p1.camera.z <= CAMERA_DEPTH || seg.p2.screen.y >= seg.p1.screen.y || seg.p2.screen.y >= maxy) continue
      renderSegment(ctx, seg)
      maxy = seg.p2.screen.y
    }

    // traffic cars: far → near
    for (let n = DRAW_DISTANCE - 1; n > 0; n--) {
      const seg = segs[(baseSeg.index + n) % segs.length]
      for (const car of seg.cars) {
        const scale = interpolate(seg.p1.screen.scale, seg.p2.screen.scale, car.percent)
        if (scale <= 0) continue
        const sx = interpolate(seg.p1.screen.x, seg.p2.screen.x, car.percent) + (scale * car.offset * ROAD_WIDTH * WIDTH) / 2
        const sy = interpolate(seg.p1.screen.y, seg.p2.screen.y, car.percent)
        const w = (scale * 1100 * WIDTH) / 2
        if (w < 4) continue
        drawPixelCar(ctx, sx, sy, w, w * 0.55, car.color)
      }
    }

    // player car
    const speedPct = sim.speed / MAX_SPEED
    const steer = (keysRef.current.left ? -1 : 0) + (keysRef.current.right ? 1 : 0)
    const bounce = speedPct > 0.05 ? Math.sin(performance.now() / 40) * 1.5 * speedPct : 0
    const pw = 116
    drawPixelCar(ctx, WIDTH / 2 + steer * 6, HEIGHT - 26 + bounce, pw, pw * 0.62, "#FFD700")

    ctx.restore()
  }, [])

  // ----- main loop (started once) -----
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(HIGHSCORE_KEY) || 0)
      resetSim(true)
      if (simRef.current && saved) simRef.current.high = saved
      setHud((h) => ({ ...h, high: saved }))
    } catch {
      resetSim(true)
    }

    const loop = (t: number) => {
      const last = lastRef.current || t
      const dt = Math.min(0.05, (t - last) / 1000)
      lastRef.current = t

      if (phaseRef.current === "playing") update(dt)
      render()

      hudAccumRef.current += dt
      if (hudAccumRef.current > 0.08) {
        hudAccumRef.current = 0
        const sim = simRef.current
        if (sim) {
          setHud({
            score: sim.score,
            high: sim.high,
            time: Math.ceil(sim.timeLeft),
            speed: Math.round((sim.speed / MAX_SPEED) * 220),
            stage: sim.checkpointCount,
          })
        }
        if (bannerExpiryRef.current && performance.now() > bannerExpiryRef.current) {
          bannerExpiryRef.current = 0
          setBanner(null)
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [update, render, resetSim])

  // ----- input -----
  useEffect(() => {
    const start = () => {
      resetSim(false)
      bannerExpiryRef.current = 0
      setBanner(null)
      setPhase("playing")
    }
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k) || k === "arrowup") e.preventDefault()
      if (k === "arrowleft" || k === "a") keysRef.current.left = true
      else if (k === "arrowright" || k === "d") keysRef.current.right = true
      else if (k === "arrowup" || k === "w") keysRef.current.up = true
      else if (k === "arrowdown" || k === "s") keysRef.current.down = true
      else if ((k === "enter" || k === " ") && phaseRef.current !== "playing") start()
    }
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === "arrowleft" || k === "a") keysRef.current.left = false
      else if (k === "arrowright" || k === "d") keysRef.current.right = false
      else if (k === "arrowup" || k === "w") keysRef.current.up = false
      else if (k === "arrowdown" || k === "s") keysRef.current.down = false
    }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [resetSim])

  // touch / pointer steering
  const steerFromPointer = (clientX: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const rel = (clientX - rect.left) / rect.width
    keysRef.current.left = rel < 0.4
    keysRef.current.right = rel > 0.6
    keysRef.current.up = true
  }
  const onPointerDown = (e: React.PointerEvent) => {
    if (phaseRef.current !== "playing") {
      resetSim(false)
      bannerExpiryRef.current = 0
      setBanner(null)
      setPhase("playing")
      return
    }
    steerFromPointer(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (phaseRef.current === "playing" && e.buttons > 0) steerFromPointer(e.clientX)
  }
  const clearTouch = () => {
    keysRef.current.left = false
    keysRef.current.right = false
    keysRef.current.up = false
  }

  const startButton = () => {
    resetSim(false)
    bannerExpiryRef.current = 0
    setBanner(null)
    setPhase("playing")
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* HUD */}
      <div className="w-full max-w-2xl flex items-center justify-between font-arcade text-[9px] md:text-[11px] text-yellow-400 mb-2 px-1">
        <span>SCORE {hud.score.toString().padStart(6, "0")}</span>
        <span className="text-orange-400">HIGH {hud.high.toString().padStart(6, "0")}</span>
        <span className={hud.time <= 10 ? "text-red-500 animate-blink" : "text-white"}>TIME {hud.time.toString().padStart(2, "0")}</span>
      </div>

      <div className="relative w-full max-w-2xl border-4 border-yellow-400" style={{ boxShadow: "0 0 24px rgba(250,204,21,0.35)" }}>
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={clearTouch}
          onPointerLeave={clearTouch}
          className="block w-full h-auto bg-black touch-none select-none"
          style={{ imageRendering: "pixelated" }}
          aria-label="Career Racer arcade game"
        />

        {/* speed readout */}
        <div className="absolute bottom-1 right-2 font-arcade text-[9px] md:text-[11px] text-yellow-400 drop-shadow">
          {hud.speed} <span className="text-orange-400">KM/H</span>
        </div>

        {/* checkpoint banner */}
        {banner && phase === "playing" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="font-arcade text-xs md:text-base text-yellow-400 animate-blink">★ CHECKPOINT {banner.stage} ★</div>
            <div className="font-arcade text-[10px] md:text-sm text-white mt-1">+{CHECKPOINT_BONUS} SEC</div>
          </div>
        )}

        {/* ready / over overlays */}
        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-center px-4">
            <div className="font-arcade text-base md:text-2xl text-yellow-400">CAREER RACER '85</div>
            {phase === "over" && (
              <div className="font-arcade text-[10px] md:text-sm text-white mt-4">
                GAME OVER<br />
                <span className="text-yellow-400">SCORE {hud.score.toString().padStart(6, "0")}</span><br />
                <span className="text-orange-400">HIGH {hud.high.toString().padStart(6, "0")}</span>
              </div>
            )}
            <button
              onClick={startButton}
              className="mt-6 font-arcade text-[10px] md:text-sm text-black bg-yellow-400 hover:bg-yellow-300 border-4 border-orange-500 px-5 py-3 animate-blink"
            >
              ▶ {phase === "over" ? "RETRY" : "PRESS START"} ◀
            </button>
            <div className="font-mono text-[10px] md:text-xs text-white/80 mt-4 leading-relaxed">
              <span className="hidden md:inline">↑/W accelerate · ↓/S brake · ←→/AD steer</span>
              <span className="md:hidden">TAP to drive · tap left / right to steer</span>
              <br />Pass checkpoints to win more time!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
