import { BootScreen } from "@/components/boot-screen"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutMe } from "@/components/about-me"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { InventorySection } from "@/components/inventory-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <BootScreen />
      <Header />
      <main>
        <section id="home" className="scroll-mt-16"><HeroSection /></section>
        <section id="about" className="scroll-mt-16"><AboutMe /></section>
        <section id="experience" className="scroll-mt-16"><ExperienceSection /></section>
        <section id="projects" className="scroll-mt-16"><ProjectsSection /></section>
        <section id="skills" className="scroll-mt-16"><InventorySection /></section>
        <section id="contact" className="scroll-mt-16"><ContactSection /></section>
      </main>
      <Footer />
    </div>
  )
}
