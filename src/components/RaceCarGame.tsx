"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface WorkExperience {
  company: string
  role: string
  description: string
  color: string
  carLevel: number
}

interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

interface Car extends GameObject {
  level: number
}

interface Barrier extends GameObject {
  experience: WorkExperience
  broken: boolean
}

const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: "Brain Racers",
    role: "Data and Development Intern",
    description: "Developed a real-time student monitoring platform and automated data workflows to deliver insights at scale and enhance learning engagement.",
    color: "#FFD700",
    carLevel: 1,
  },
  {
    company: "UW Data Science Club",
    role: "Data Scientist",
    description:
      "I trained a neural network with PyTorch to detect animals in images (amongst other things).",
    color: "#FFA500",
    carLevel: 2,
  },
  {
    company: "Epoch",
    role: "Data Intern",
    description:
      "Built automation tools, machine learning models, and sentiment analysis pipelines to streamline reporting and analytics, saving clients significant time and improving accuracy.",
    color: "#FFA500",
    carLevel: 3,
  },
  {
    company: "Epoch (x2)",
    role: "Full Stack Developer",
    description:
      "Optimized data pipelines and backend infrastructure with ETL, FastAPI, and SQL, improving analytics speed, reliability, and cost efficiency.",
    color: "#FF8C00",
    carLevel: 4,
  },
  {
    company: "Waterloo Science Society",
    role: "Frontend Developer",
    description:
      "Designed + Developed UW SciSoc's website",
    color: "#FF7F50",
    carLevel: 5,
  },

]

export default function RetroRacecarGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number>()

  const [gameState, setGameState] = useState({
    isRunning: true,
    score: 0,
    currentExperience: 0,
    gameSpeed: 1.5,
    gameComplete: false,
  })

  const [car, setCar] = useState<Car>({
    x: 100,
    y: 200,
    width: 40,
    height: 20,
    level: 1,
  })

  const [barriers, setBarriers] = useState<Barrier[]>([])
  const [roadOffset, setRoadOffset] = useState(0)

  const autopilot = useCallback((currentCar: Car) => {
    const canvas = canvasRef.current
    if (!canvas) return { targetY: currentCar.y }

    const centerY = canvas.height / 2 - currentCar.height / 2
    return { targetY: centerY }
  }, [])

  const drawCar = useCallback((ctx: CanvasRenderingContext2D, carObj: Car) => {
    const { x, y, width, height, level } = carObj

    ctx.save()

    // Car emojis for each level
    const carEmojis = {
      1: "🫩", // Basic Vehicle
      2: "😟", // Sports Car
      3: "😮", // Racing Car
      4: "😆", // Luxury Sports
      5: "😁", // Supercar
    }

    const emoji = carEmojis[level as keyof typeof carEmojis] || "🚗"
    
    // Set font size based on car size
    const fontSize = Math.min(width, height) * 1.2
    ctx.font = `${fontSize}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    
    // Add glow effect for higher levels
    if (level >= 4) {
      ctx.shadowColor = "#FFD700"
      ctx.shadowBlur = 10
    }
    
    // Draw the emoji
    ctx.fillText(emoji, x + width / 2, y + height / 2)
    
    // Reset shadow
    ctx.shadowBlur = 0

    ctx.restore()
  }, [])

  const drawRoad = useCallback((ctx: CanvasRenderingContext2D, offset: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 50, canvas.width, canvas.height - 100)

    ctx.fillStyle = "#FFD700"
    ctx.fillRect(0, 50, canvas.width, 5)
    ctx.fillRect(0, canvas.height - 55, canvas.width, 5)

    const lineWidth = 30
    const lineGap = 20
    const totalPattern = lineWidth + lineGap

    for (let x = -totalPattern + (offset % totalPattern); x < canvas.width; x += totalPattern) {
      ctx.fillRect(x, canvas.height / 2 - 2, lineWidth, 4)
    }

    ctx.fillStyle = "#FF8C00"
    for (let x = -20 + (offset % 40); x < canvas.width; x += 40) {
      ctx.fillRect(x, 70, 15, 3)
      ctx.fillRect(x, canvas.height - 75, 15, 3)
    }
  }, [])

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || !gameState.isRunning || gameState.gameComplete) return

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    setRoadOffset((prev) => prev + gameState.gameSpeed)

    drawRoad(ctx, roadOffset)

    const { targetY } = autopilot(car)

    setCar((prevCar) => ({
      ...prevCar,
      y: prevCar.y + (targetY - prevCar.y) * 0.1,
      level: Math.min(5, gameState.currentExperience + 1),
    }))

    setBarriers((prevBarriers) => {
      const newBarriers = prevBarriers
        .map((barrier) => ({ ...barrier, x: barrier.x - gameState.gameSpeed }))
        .filter((barrier) => barrier.x > -barrier.width)

      if (newBarriers.length === 0 && gameState.currentExperience < WORK_EXPERIENCES.length) {
        const experience = WORK_EXPERIENCES[gameState.currentExperience]
        newBarriers.push({
          x: canvas.width + 200,
          y: 80,
          width: 80,
          height: canvas.height - 160,
          experience,
          broken: false,
        })
      }

      return newBarriers
    })

    barriers.forEach((barrier) => {
      if (!barrier.broken) {
        ctx.fillStyle = barrier.experience.color
        ctx.shadowColor = barrier.experience.color
        ctx.shadowBlur = 10
        ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height)
        ctx.shadowBlur = 0

        ctx.fillStyle = "#000000"
        ctx.font = "bold 14px monospace"
        ctx.textAlign = "center"
        ctx.save()
        ctx.translate(barrier.x + barrier.width / 2, barrier.y + barrier.height / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.fillText(barrier.experience.company, 0, 0)
        ctx.restore()
      }
    })

    drawCar(ctx, car)

    setBarriers((prevBarriers) =>
      prevBarriers.map((barrier) => {
        if (
          !barrier.broken &&
          car.x + car.width > barrier.x &&
          car.x < barrier.x + barrier.width &&
          car.y < barrier.y + barrier.height &&
          car.y + car.height > barrier.y
        ) {
          setGameState((prev) => {
            const nextExperience = prev.currentExperience + 1
            return {
              ...prev,
              score: prev.score + 1000,
              currentExperience: nextExperience,
              gameComplete: nextExperience >= WORK_EXPERIENCES.length,
            }
          })

          return { ...barrier, broken: true }
        }
        return barrier
      }),
    )

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [car, barriers, gameState, roadOffset, autopilot, drawCar, drawRoad])

  useEffect(() => {
    if (gameState.isRunning && !gameState.gameComplete) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameLoop, gameState.isRunning, gameState.gameComplete])

  const resetGame = () => {
    setGameState({
      isRunning: true,
      score: 0,
      currentExperience: 0,
      gameSpeed: 1.5,
      gameComplete: false,
    })
    setCar({
      x: 100,
      y: 200,
      width: 40,
      height: 20,
      level: 1,
    })
    setBarriers([])
    setRoadOffset(0)
  }

  const currentExp = WORK_EXPERIENCES[Math.min(gameState.currentExperience, WORK_EXPERIENCES.length - 1)]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 text-yellow-400">
            CAREER RACER '85
          </h1>
          <p className="text-orange-400">Career Journey</p>
        </div>

        <div className="flex justify-between items-center mb-4 bg-card p-4 border-2 border-yellow-400">
          <div className="text-foreground">
            <div>SCORE: {gameState.score.toString().padStart(4, "0")}</div>
            <div>SPEED: {gameState.gameSpeed.toFixed(1)}x</div>
          </div>
          <div className="text-foreground">
            <div>HAPPY LEVEL: {car.level}</div>
            <div>
              EXPERIENCE: {gameState.currentExperience}/{WORK_EXPERIENCES.length}
            </div>
            {gameState.gameComplete && <div className="text-green-400 font-bold">GAME COMPLETE! COME BACK LATER FOR MORE</div>}
          </div>
          <Button
            onClick={resetGame}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 border-4 border-yellow-400 hover:text-black"
          >
            RESTART
          </Button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="border-2 border-yellow-400 bg-black"
              style={{ boxShadow: "0 0 20px #FFD700" }}
            />
          </div>

          <div className="w-96 bg-card border-2 border-orange-400 p-6">
            <div className="space-y-4">
              <div>
                <div className="text-foreground font-bold text-lg">{currentExp.company}</div>
                <div className="text-muted-foreground text-md">{currentExp.role}</div>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed min-h-[120px]">{currentExp.description}</div>
              <div className="mt-4 p-3 bg-black border border-yellow-400">
                <div className="text-xs text-yellow-400">HAPPY UPGRADE LEVEL: {currentExp.carLevel}</div>
                <div className="text-xs text-orange-400">
                  {currentExp.carLevel === 1 && "Sad"}
                  {currentExp.carLevel === 2 && "Less Sad"}
                  {currentExp.carLevel === 3 && "Normal"}
                  {currentExp.carLevel === 4 && "Happy"}
                  {currentExp.carLevel === 5 && "Very Happy"}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}
