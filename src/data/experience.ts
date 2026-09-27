export interface WorkExperience {
  company: string
  role: string
  dates: string
  location: string
  color: string
  carLevel: number
}

// Stored in chronological order (oldest first) so the race-car game levels up
// over time. The Experience timeline shows them in this same order.
export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: "Epoch",
    role: "Data Analytics Intern",
    dates: "Sep 2024 – Dec 2024",
    location: "San Francisco, CA",
    color: "#FFD700",
    carLevel: 1,
  },
  {
    company: "Epoch",
    role: "Software Engineering Intern",
    dates: "May 2025 – Aug 2025",
    location: "San Francisco, CA",
    color: "#FFA500",
    carLevel: 2,
  },
  {
    company: "Stealth Startup",
    role: "Founding Engineer",
    dates: "Sep 2025 – Present",
    location: "Toronto, ON",
    color: "#FF8C00",
    carLevel: 3,
  },
  {
    company: "Sapling Financial Consultants",
    role: "Data Engineer Intern",
    dates: "Jan 2026 – May 2026",
    location: "Toronto, ON",
    color: "#FF7F50",
    carLevel: 4,
  },
  {
    company: "Owner.com",
    role: "Software Engineer Intern",
    dates: "Sep 2026 – Present",
    location: "San Francisco, CA",
    color: "#FF6347",
    carLevel: 5,
  },
]
