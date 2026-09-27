import {
  siDjango,
  siDocker,
  siFastapi,
  siGit,
  siGooglecloud,
  siHuggingface,
  siJavascript,
  siJupyter,
  siKeras,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSelenium,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons"
import { projects } from "@/data/projects"

export const TABS = ["LANGUAGES", "DATA & ML", "WEB", "TOOLS"] as const
export type Tab = (typeof TABS)[number]

export interface Item {
  name: string
  tab: Tab
  // Logo from simple-icons; items without one show `short` as a pixel badge.
  icon?: SimpleIcon
  short?: string
  // Other spellings used in the projects' tech lists.
  aliases?: string[]
}

export const items: Item[] = [
  { name: "Python", tab: "LANGUAGES", icon: siPython },
  { name: "TypeScript", tab: "LANGUAGES", icon: siTypescript },
  { name: "JavaScript", tab: "LANGUAGES", icon: siJavascript },
  { name: "SQL", tab: "LANGUAGES", short: "SQL", aliases: ["PostgreSQL"] },

  { name: "Pandas", tab: "DATA & ML", icon: siPandas },
  { name: "NumPy", tab: "DATA & ML", icon: siNumpy },
  { name: "Scikit-learn", tab: "DATA & ML", icon: siScikitlearn },
  { name: "PyTorch", tab: "DATA & ML", icon: siPytorch },
  { name: "Keras", tab: "DATA & ML", icon: siKeras },
  { name: "Hugging Face", tab: "DATA & ML", icon: siHuggingface },
  { name: "PostgreSQL", tab: "DATA & ML", icon: siPostgresql },
  { name: "dbt", tab: "DATA & ML", short: "DBT" },
  { name: "Matplotlib", tab: "DATA & ML", short: "PLT" },
  { name: "Librosa", tab: "DATA & ML", short: "LBR" },
  { name: "Jupyter", tab: "DATA & ML", icon: siJupyter, aliases: ["Jupyter Notebook"] },

  { name: "React", tab: "WEB", icon: siReact },
  { name: "Next.js", tab: "WEB", icon: siNextdotjs },
  { name: "Node.js", tab: "WEB", icon: siNodedotjs },
  { name: "FastAPI", tab: "WEB", icon: siFastapi },
  { name: "Django REST", tab: "WEB", icon: siDjango, aliases: ["Django Rest Framework"] },
  { name: "Tailwind CSS", tab: "WEB", icon: siTailwindcss },
  { name: "shadcn/ui", tab: "WEB", icon: siShadcnui, aliases: ["Shadcn"] },

  { name: "Git", tab: "TOOLS", icon: siGit },
  { name: "Docker", tab: "TOOLS", icon: siDocker },
  { name: "Linux", tab: "TOOLS", icon: siLinux },
  { name: "AWS", tab: "TOOLS", short: "AWS" },
  { name: "Google Cloud", tab: "TOOLS", icon: siGooglecloud },
  { name: "Selenium", tab: "TOOLS", icon: siSelenium },
  { name: "BeautifulSoup", tab: "TOOLS", short: "BS4" },
]

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")

// Project titles whose tech list mentions this item, so the item card stays in
// sync with the trophy case automatically.
export function usedIn(item: Item): string[] {
  const names = new Set([item.name, ...(item.aliases ?? [])].map(normalize))
  return projects.filter((p) => p.tech.some((t) => names.has(normalize(t)))).map((p) => p.title)
}
