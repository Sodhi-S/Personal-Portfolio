export interface Project {
  title: string
  description: string
  tech: string[]
  status: "COMPLETED" | "IN PROGRESS"
  difficulty: string
  achievement: string
  link: string
}

export const projects: Project[] = [
  {
    title: "SPOTIFY ANALYTICS PLATFORM",
    description:
      "End-to-end music analytics surfacing 1+ years of personalized listening trends — a raw-to-mart dbt warehouse (15 models, 6+ APIs) feeding a Hugging Face mood-inference ingestion pipeline.",
    tech: ["PostgreSQL", "dbt", "Hugging Face", "FastAPI", "React", "Python"],
    status: "IN PROGRESS",
    difficulty: "★★★★★",
    achievement: "🎵",
    link: "https://github.com/Sodhi-S",
  },
  {
    title: "THIS WEBSITE",
    description: "I mean isn't this kind of a project ??? I'd consider it to be",
    tech: ["TypeScript", "Next.js", "Shadcn", "Tailwind CSS"],
    status: "COMPLETED",
    difficulty: "★★★☆☆",
    achievement: "⚡",
    link: "https://github.com/Sodhi-S/Personal-Portfolio",
  },
  {
    title: "SPEECH EMOTION RECOGNITION",
    description: "Neural network trained to detect emotions in speech",
    tech: ["Python", "Pandas", "Librosa", "Numpy", "Keras"],
    status: "COMPLETED",
    difficulty: "★★★☆☆",
    achievement: "🏆",
    link: "https://github.com/Sodhi-S/Speech-Emotion-Recognition",
  },
  {
    title: "GO PHISH",
    description: "Phishing email detection chrome extension + AI based detection",
    tech: ["Python", "TypeScript", "React", "Scikit-learn", "Django Rest Framework"],
    status: "COMPLETED",
    difficulty: "★★★★★",
    achievement: "💎",
    link: "https://github.com/achow111/go-phish-",
  },
  {
    title: "CREDIT CARD FRAUD DETECTION",
    description: "Credit card fraud detection using machine learning",
    tech: ["Python", "Pandas", "Scikit Learn", "MatPlotLib"],
    status: "COMPLETED",
    difficulty: "★★★☆☆",
    achievement: "🥈",
    link: "https://github.com/Sodhi-S/CreditCard_Fraud_Detection",
  },
  {
    title: "STATSANITY",
    description: "NBA statistics prediction using neural networks :)",
    tech: ["Python", "PyTorch", "BeautifulSoup", "Selenium"],
    status: "IN PROGRESS",
    difficulty: "★★★★☆",
    achievement: "😝",
    link: "https://github.com/Sodhi-S/NBA-Statistics-Prediction",
  },
  {
    title: "FAKE NEWS DETECTION",
    description: "This is kinda how I started learning Pandas",
    tech: ["Python", "Pandas", "SciKit Learn", "Jupyter Notebook"],
    status: "COMPLETED",
    difficulty: "★★★★★",
    achievement: "⚡",
    link: "https://github.com/Sodhi-S/Fake-News-Detection",
  },
]
