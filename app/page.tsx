import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutMe } from "@/components/about-me"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="md:pl-52">
        <main>
          <section id="home"><HeroSection /></section>
          <section id="about"><AboutMe /></section>
          <section id="experience"><ExperienceSection /></section>
          <section id="projects"><ProjectsSection /></section>
          <section id="skills"><SkillsSection /></section>
          <section id="contact"><ContactSection /></section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
