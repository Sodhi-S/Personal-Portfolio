export interface WorkExperience {
  company: string
  role: string
  description: string
  dates: string
  location: string
  color: string
  carLevel: number
}

// Stored in chronological order (oldest first) so the race-car game levels up
// over time. The Experience section reverses this for most-recent-first display.
export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: "Epoch",
    role: "Data Analytics Intern",
    description:
      "Cut quarterly report turnaround from 2–4 days to 15 minutes by building an internal Streamlit app that automated report generation with Python + Pandas.",
    dates: "Sep 2024 – Dec 2024",
    location: "San Francisco, CA",
    color: "#FFD700",
    carLevel: 1,
  },
  {
    company: "Epoch",
    role: "Software Engineering Intern",
    description:
      "Cut API response times 17% for 20+ clients by migrating Epoch's backend from Flask to FastAPI with async request handling, and owned 25+ zero-downtime PostgreSQL migrations via Alembic.",
    dates: "May 2025 – Aug 2025",
    location: "San Francisco, CA",
    color: "#FFA500",
    carLevel: 2,
  },
  {
    company: "Stealth Startup",
    role: "Founding Engineer",
    description:
      "Building the sickest software ever. Much more to come",
    dates: "Sep 2025 – Present",
    location: "Toronto, ON",
    color: "#FF8C00",
    carLevel: 3,
  },
  {
    company: "Sapling Financial Consultants",
    role: "Data Engineer Intern",
    description:
      "Cut reporting errors 25% with Python data-quality checks in ETL pipelines, built Azure Data Factory pipelines ingesting 7+ REST APIs into Azure SQL & AWS RDS, and shipped a PostgreSQL + Power BI model giving finance teams self-serve reporting.",
    dates: "Jan 2026 – May 2026",
    location: "Toronto, ON",
    color: "#FF7F50",
    carLevel: 4,
  },
]
