# FRD — "CAREER RACER '85" (Easter Egg Mini-Game)

**Status:** Draft
**Owner:** Sahej Sodhi
**Last updated:** 2026-06-22
**Component:** `src/components/RaceCarGame.tsx`, `src/components/RaceCarGameModal.tsx`
**Data source:** `src/data/experience.ts` (`WORK_EXPERIENCES`)

---

## 1. Purpose

The portfolio has a hidden race-car mini-game that maps Sahej's co-op
experiences to "levels." It is meant to be a delightful easter egg that
rewards curious visitors and reinforces the retro-arcade theme. Today it
fails at being a *game*. This document defines what it must become.

---

## 2. Problem Statement (why the current version falls short)

| # | Problem | Evidence in code |
|---|---------|------------------|
| P1 | **There is no gameplay.** The car is on autopilot — it auto-centers and auto-smashes every barrier. The player presses nothing and the outcome never changes. | `autopilot()` always returns `centerY`; no keyboard/touch handlers exist. |
| P2 | **No challenge, no fail state, no replay value.** Score only ever goes up by 1000 per barrier; you cannot lose; every run is identical. | `gameState` has no `lives`/`gameOver`; collisions only ever *help*. |
| P3 | **Technically buggy.** The rAF loop reads `car`/`barriers` from a stale closure, calls `setState` *during* the loop's render work, and lists `car, barriers, gameState, roadOffset` as effect deps so the loop is torn down and rebuilt every frame. | `gameLoop` deps array (line ~204); `barriers.forEach` vs `setBarriers`; nested `setGameState` inside `setBarriers` map. |
| P4 | **Not responsive.** Fixed `800×400` canvas plus a `w-96` side panel in a flex row overflows the dialog on tablet/mobile. | `<canvas width={800} height={400}>` + `flex gap-6` + `w-96`. |
| P5 | **Off-theme presentation.** "Cars" are random/broken emoji (🫩😟😮😆😁) labeled "HAPPY LEVEL"; copy doesn't match the rest of the arcade site; no pixel font. | `carEmojis` map; `HAPPY LEVEL` / `Sad…Very Happy` labels. |
| P6 | **Weak discovery.** It's just a button. An "easter egg" should feel *found*, not clicked. | `RaceCarGameModal` trigger is a plain visible button. |

---

## 3. Goals & Non-Goals

### Goals
- **G1** Make it a *real* game: continuous player input, a way to win, a way to lose.
- **G2** Tie progression meaningfully to the 4 real co-op experiences.
- **G3** Make it fully playable in the modal on desktop **and** mobile/touch.
- **G4** Match the site's 80s arcade identity (pixel font, yellow/orange/black, CRT feel).
- **G5** Make it discoverable as an easter egg, while keeping an obvious entry too.
- **G6** Fix the architecture so the loop is correct and performant (stable 60fps).

### Non-Goals
- Multiplayer, leaderboards on a server, or accounts (local high score only).
- A physics engine or external game framework (stay vanilla canvas + React HUD).
- Mobile app / install. This is a web easter egg.

---

## 4. The Easter Egg — Discovery & Entry

**FR-EE1 — Hidden trigger (primary "egg" feel).** Launch the game when the
visitor enters the **Konami code** (`↑ ↑ ↓ ↓ ← → ← → B A`) anywhere on the
page. On success: brief "1UP" flash + sound, then the modal opens.

**FR-EE2 — Themed alternate trigger.** Clicking the hero **🍄 mushroom** N=3
times (or the existing "▶ PRESS START ◀" prompt) also opens it. This rewards
the people already poking at the arcade props.

**FR-EE3 — Visible fallback.** Keep a discoverable "INSERT COIN" / "START GAME"
button so it isn't *only* hidden (accessibility + recruiters who won't hunt).

**FR-EE4 — One-time hint (optional).** After ~30s idle on the home section, a
subtle blinking "↑↑↓↓…?" hint may appear once per session.

---

## 5. Functional Requirements — Gameplay

### 5.1 Core loop
**FR-G1 — Player control.** The player controls the car's vertical position
(and only that; horizontal scroll is automatic). Inputs:
- Desktop: `↑`/`↓` or `W`/`S` (hold to move).
- Touch: drag anywhere on the canvas, or tap top/bottom half to nudge.
- Movement is smooth (lerp toward target), not teleport.

**FR-G2 — Hazards to avoid.** The road scrolls left→right with **obstacles**
(oil slicks, traffic cones, rival cars) that must be dodged. Hitting one costs
a life and briefly flashes/invulnerabilizes the car.

**FR-G3 — Experience gates (the point).** Periodically a colored **gate**
representing the next `WORK_EXPERIENCE` appears. Driving *through* the gate
(not crashing into its frame) "clears" that experience: +score, car upgrade,
and a short level-clear interstitial showing the role/company/dates/description.

**FR-G4 — Difficulty ramp.** `gameSpeed` increases gradually with distance and
steps up after each experience cleared. Obstacle density scales with speed.

**FR-G5 — Lives & game over.** Player starts with 3 lives. Zero lives →
**GAME OVER** screen with final score, distance, and high score; offers RESTART.

**FR-G6 — Win condition.** Clearing all 4 experiences → **YOU WIN / "QUEST
COMPLETE"** screen summarizing the career path, with a CTA back to the
Experience section and a "play again (endless mode)" option.

### 5.2 Scoring & persistence
- **FR-S1** Score = distance traveled + bonus per experience cleared + dodge streak bonus.
- **FR-S2** Persist **high score** and **best distance** to `localStorage` (`career-racer:highscore`).
- **FR-S3** Display SCORE, HIGH, LIVES, SPEED, and `EXPERIENCE x/4` in a pixel-font HUD.

### 5.3 States
`READY (press start)` → `PLAYING` → (`LEVEL CLEAR` interstitial) → `PLAYING` →
`GAME OVER` **or** `WIN`. Closing the modal **pauses**; reopening resumes or
re-shows READY. Loop must stop (`cancelAnimationFrame`) whenever not `PLAYING`.

---

## 6. Content Mapping

Drive progression from `WORK_EXPERIENCES` (single source of truth) so the game
never drifts from the résumé:

| Order | Experience | Gate color | Car upgrade (level) |
|------|------------|-----------|---------------------|
| 1 | Epoch — Data Analytics Intern | `exp.color` | 1 |
| 2 | Epoch — Software Engineering Intern | `exp.color` | 2 |
| 3 | Stealth Startup — Founding Engineer | `exp.color` | 3 |
| 4 | Sapling Financial — Data Engineer Intern | `exp.color` | 4 |

**FR-C1** Number of gates = `WORK_EXPERIENCES.length` (auto-scales if Sahej
adds a role). **FR-C2** Each gate's label, color, and clear-screen copy come
from the data object — no hard-coded company names in the game.

---

## 7. Visual / UX Requirements

- **FR-V1** Title "CAREER RACER '85" and all HUD/labels in the **Press Start**
  pixel font (`font-arcade`), yellow/orange/black palette, CRT scanline overlay
  reused from the hero.
- **FR-V2** Replace emoji cars with a **drawn pixel sprite** (or a single
  consistent on-theme emoji) that visibly upgrades per level; drop the
  "HAPPY/Sad" labeling.
- **FR-V3** Level-clear interstitial styled like an arcade "STAGE CLEAR" card,
  showing role • company • dates • location • one-line description.
- **FR-V4** Sound: short blips for dodge/clear/crash/game-over and a mute
  toggle (default **muted**; respect first user gesture before any audio).
- **FR-V5** Honor `prefers-reduced-motion` (reduce scanline flicker / shake).

---

## 8. Technical Requirements

- **FR-T1 — Single mutable game state in refs.** Keep the live simulation
  (car, obstacles, gates, speed, score) in a `useRef` object mutated inside the
  loop. React state is used **only** for HUD/overlays, updated at a throttled
  cadence. This removes all stale-closure reads (fixes P3).
- **FR-T2 — One stable loop.** `requestAnimationFrame` started once on mount /
  state→PLAYING; effect deps must **not** include per-frame values. Use a
  delta-time step so speed is frame-rate independent.
- **FR-T3 — No setState during draw.** Collision/score updates mutate refs;
  overlays are derived afterward.
- **FR-T4 — Responsive canvas.** Render at a fixed internal resolution and
  scale via CSS to fit the dialog; stack the info panel below the canvas on
  small screens (no `w-96` side-by-side on mobile).
- **FR-T5 — Lifecycle.** Pause + cancel rAF on modal close / tab blur
  (`visibilitychange`); resume cleanly. No leaked animation frames.
- **FR-T6 — Input abstraction.** A small input module mapping keyboard + touch
  to a single `targetY` / actions so control sources stay decoupled.

---

## 9. Accessibility

- **FR-A1** Modal is keyboard-trappable and `Esc`-closable (already via Dialog);
  ensure game key handlers don't swallow `Esc`/`Tab`.
- **FR-A2** Provide a visible control hint ("↑/↓ or drag to steer").
- **FR-A3** Audio off by default; motion reduced when requested (FR-V5).
- **FR-A4** Give the canvas an `aria-label`; offer a text "skip to Experience
  section" link for non-players.

---

## 10. Phased Delivery

1. **Phase 1 — Make it a game (MVP):** player control (FR-G1), hazards + lives
   + game over (FR-G2/G5), gates clear experiences (FR-G3), local high score
   (FR-S2). Refactor to refs/single-loop (FR-T1–T3).
2. **Phase 2 — Polish & theme:** pixel-font HUD + sprites + interstitials
   (FR-V1–V3), responsive canvas (FR-T4), difficulty ramp + win screen
   (FR-G4/G6).
3. **Phase 3 — Easter-egg layer:** Konami + 🍄 triggers (FR-EE1/EE2), idle hint
   (FR-EE4), sound + mute (FR-V4), reduced-motion (FR-V5).

---

## 11. Success Criteria

- A first-time player understands the controls within ~3 seconds and can lose.
- ≥ 60fps on a mid-range laptop; no rAF leaks across open/close cycles.
- Playable end-to-end on a phone in the modal.
- Adding a new role to `WORK_EXPERIENCES` adds a gate with **zero** game-code changes.

---

## 12. Open Questions

- **Dodge vs. smash:** do you *avoid* obstacles and *collect* experience gates
  (recommended), or *smash* through everything (current vibe)? This changes the
  core verb.
- **Endless mode** after the win screen — worth it, or stop at 4 levels?
- **Konami** as the canonical egg, or prefer the 🍄 click so it's findable on
  touch devices (no keyboard)?
- Custom pixel **sprite art** vs. a single consistent emoji — how much art time
  do you want to spend?
