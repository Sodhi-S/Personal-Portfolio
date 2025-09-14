import { Header } from "@/components/header"
import { SkillsSection } from "@/components/skills-section"
import { Footer } from "@/components/footer"

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SkillsSection />
      </main>
      <Footer />
    </div>
  )
}
