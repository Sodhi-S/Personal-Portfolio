import Image from "next/image"

// Set to an image in /public (e.g. "/avatar.png") once the pixel avatar is ready.
// Used by Character Select and the projects world map.
const AVATAR_SRC: string | null = null

// Placeholder pixel character, one character per pixel.
const AVATAR_PIXELS = [
  "....HHHH....",
  "...HHHHHH...",
  "..HHHHHHHH..",
  "..HSSSSSSH..",
  "..SSESSESS..",
  "..SSSSSSSS..",
  "...SSMMSS...",
  "....SSSS....",
  "..TTTTTTTT..",
  ".TTTTTTTTTT.",
  ".TT.TTTT.TT.",
  ".SS.TTTT.SS.",
  "....PP.PP...",
  "....PP.PP...",
]
const AVATAR_COLORS: Record<string, string> = {
  H: "#1c1917",
  S: "#d6a06b",
  E: "#111111",
  M: "#7c2d12",
  // Theme colours, so the avatar follows the Vice City easter egg too.
  T: "var(--color-yellow-400)",
  P: "var(--color-orange-500)",
}

export function Avatar({ className = "" }: { className?: string }) {
  if (AVATAR_SRC) {
    return (
      <div className={`relative aspect-[6/7] ${className}`}>
        <Image src={AVATAR_SRC} alt="Sahej's avatar" fill className="object-contain [image-rendering:pixelated]" />
      </div>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${AVATAR_PIXELS[0].length} ${AVATAR_PIXELS.length}`}
      className={`h-auto ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {AVATAR_PIXELS.flatMap((row, y) =>
        row.split("").map((c, x) =>
          AVATAR_COLORS[c] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} style={{ fill: AVATAR_COLORS[c] }} /> : null,
        ),
      )}
    </svg>
  )
}
