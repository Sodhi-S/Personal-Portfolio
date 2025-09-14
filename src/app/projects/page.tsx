import { Header } from "@/components/header"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
