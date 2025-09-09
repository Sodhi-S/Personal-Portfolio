import { Header } from "@/components/header"
import { AboutMe } from "@/components/about-me"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutMe/>
      </main>
      <Footer />
    </div>
  )
}