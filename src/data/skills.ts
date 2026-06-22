export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

// Single source of truth for skills. Values toned down for consistency
// and ordered by real strength within each category.
export const skillCategories: SkillCategory[] = [
  {
    title: "DATA SCIENCE",
    icon: "📊",
    skills: [
      { name: "Python", level: 92 },
      { name: "Machine Learning", level: 88 },
      { name: "Data Visualization", level: 88 },
      { name: "Statistics", level: 85 },
      { name: "Deep Learning", level: 82 },
    ],
  },
  {
    title: "SOFTWARE DEV",
    icon: "💻",
    skills: [
      { name: "JavaScript/TypeScript", level: 88 },
      { name: "React/Next.js", level: 85 },
      { name: "Node.js", level: 82 },
      { name: "SQL/NoSQL", level: 80 },
      { name: "Cloud Platforms", level: 75 },
    ],
  },
  {
    title: "TOOLS & TECH",
    icon: "🛠️",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Jupyter/Colab", level: 88 },
      { name: "Linux/Unix", level: 80 },
      { name: "Docker", level: 78 },
      { name: "AWS/GCP", level: 75 },
    ],
  },
]
