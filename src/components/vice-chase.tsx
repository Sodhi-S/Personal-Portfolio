// Vice City stand-in for the hero's Pac-Man strip: a sports car grabbing cash
// with the cops on its tail. Same 4s loop as Pac-Man (see .chase-* in globals.css).

// One character per pixel. P = paint, C = glass, K = tyres/trim, Y = headlight,
// R = tail light, W = white body, S / B = red / blue sirens.
const SPORTS_CAR = [
  "......PPPPPP......",
  ".....PCCCCCCP.....",
  "..PPPPPPPPPPPPPP..",
  ".PPPPPPPPPPPPPPPPY",
  "RPPPPPPPPPPPPPPPPP",
  ".PPKKKPPPPPPKKKPP.",
  "...KKK......KKK...",
]

const POLICE_CAR = [
  ".......SSBB.......",
  "......WWWWWW......",
  ".....WCCCCCCW.....",
  "..WWWWWWWWWWWWWW..",
  ".KKKKKKKKKKKKKKKKY",
  "RWWWWWWWWWWWWWWWWW",
  ".WWKKKWWWWWWKKKWW.",
  "...KKK......KKK...",
]

const COLORS: Record<string, string> = {
  P: "#ff2e97",
  C: "#7df9ff",
  K: "#12002b",
  Y: "#fff6b0",
  R: "#ff3b3b",
  W: "#f1f5f9",
}

function Sprite({ pixels, className }: { pixels: string[]; className: string }) {
  return (
    <svg
      viewBox={`0 0 ${pixels[0].length} ${pixels.length}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {pixels.flatMap((row, y) =>
        row.split("").map((c, x) => {
          if (c === ".") return null
          const siren = c === "S" ? "siren-red" : c === "B" ? "siren-blue" : undefined
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              className={siren}
              style={siren ? undefined : { fill: COLORS[c] }}
            />
          )
        }),
      )}
    </svg>
  )
}

// Skyline silhouette: [x, width, height] per building, on a 100-wide strip.
const BUILDINGS = [
  [0, 9, 22], [8, 6, 34], [13, 10, 18], [22, 5, 40], [26, 9, 26], [34, 7, 14],
  [40, 8, 30], [47, 5, 44], [51, 10, 20], [60, 7, 36], [66, 9, 16], [74, 6, 28],
  [79, 8, 42], [86, 7, 22], [92, 8, 32],
]

export function ViceChase() {
  return (
    <div className="chase-stage" aria-hidden="true">
      {/* Ocean Drive skyline with a few lit windows */}
      <svg className="chase-skyline" viewBox="0 0 100 44" preserveAspectRatio="none">
        {BUILDINGS.map(([x, w, h]) => (
          <rect key={x} x={x} y={44 - h} width={w} height={h} fill="#2a0a4a" />
        ))}
        {BUILDINGS.filter((_, i) => i % 2 === 0).map(([x, w, h]) => (
          <rect key={`win-${x}`} x={x + w / 2 - 0.8} y={44 - h + 4} width={1.6} height={1.6} fill={x % 3 ? "#7df9ff" : "#ff6ec7"} />
        ))}
      </svg>

      {/* Helicopter searchlight sweeping the street */}
      <span className="chase-searchlight" />

      {/* Cash pickups, grabbed in the same beats Pac-Man eats dots */}
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <span key={n} className={`chase-cash c${n}`}>$</span>
      ))}

      <div className="chase-runner chase-hero">
        <Sprite pixels={SPORTS_CAR} className="chase-car" />
      </div>
      {[1, 2, 3].map((n) => (
        <div key={n} className={`chase-runner chase-cop p${n}`}>
          <Sprite pixels={POLICE_CAR} className="chase-car" />
        </div>
      ))}

      {/* Wanted level climbs as the cash gets grabbed */}
      <div className="chase-wanted">
        <span className="w1">★</span>
        <span className="w2">★</span>
        <span className="w3">★</span>
      </div>

      <div className="chase-road" />
    </div>
  )
}
