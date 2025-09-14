import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-400 text-black px-6 py-3 border-4 border-orange-500 mb-4">
            <h1 className="text-3xl font-bold tracking-wider">ABOUT MARIO DEV</h1>
          </div>
          <p className="text-white text-lg">Level 1-1: Origin Story</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Character Stats */}
          <Card className="bg-black border-4 border-yellow-400 p-6">
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-orange-500 mb-4">
              <h2 className="text-xl font-bold">CHARACTER STATS</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">NAME:</span>
                <span className="text-yellow-400">Your Name Here</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">CLASS:</span>
                <span className="text-orange-500">Data Scientist / Developer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">LEVEL:</span>
                <span className="text-yellow-400">Senior</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">LOCATION:</span>
                <span className="text-white">Your City, Country</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">EXPERIENCE:</span>
                <span className="text-orange-500">5+ Years</span>
              </div>
            </div>
          </Card>

          {/* Power-ups */}
          <Card className="bg-black border-4 border-orange-500 p-6">
            <div className="bg-orange-500 text-black px-4 py-2 border-2 border-yellow-400 mb-4">
              <h2 className="text-xl font-bold">POWER-UPS</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-400 text-black p-3 border-2 border-orange-500 text-center">
                <div className="text-lg mb-1">🧠</div>
                <div className="text-xs font-bold">MACHINE LEARNING</div>
              </div>
              <div className="bg-yellow-400 text-black p-3 border-2 border-orange-500 text-center">
                <div className="text-lg mb-1">💻</div>
                <div className="text-xs font-bold">FULL STACK</div>
              </div>
              <div className="bg-yellow-400 text-black p-3 border-2 border-orange-500 text-center">
                <div className="text-lg mb-1">📊</div>
                <div className="text-xs font-bold">DATA VIZ</div>
              </div>
              <div className="bg-yellow-400 text-black p-3 border-2 border-orange-500 text-center">
                <div className="text-lg mb-1">☁️</div>
                <div className="text-xs font-bold">CLOUD TECH</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="bg-black border-4 border-yellow-400 p-8 mb-8">
          <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-orange-500 mb-6 inline-block">
            <h2 className="text-xl font-bold">MY QUEST</h2>
          </div>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Welcome to my digital kingdom! I'm a passionate data scientist and software developer who loves turning
              complex problems into elegant solutions. Like Mario collecting coins, I collect insights from data and
              transform them into actionable strategies.
            </p>
            <p>
              My journey began in the world of mathematics and statistics, but I quickly discovered the power of
              programming. From building machine learning models that predict user behavior to creating full-stack
              applications that serve thousands of users, I've been on an epic quest to master the art of technology.
            </p>
            <p>
              When I'm not coding or analyzing data, you can find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community. Every project is a new level to
              conquer, and I'm always ready for the next challenge!
            </p>
          </div>
        </Card>

        {/* Achievement Badges */}
        <Card className="bg-black border-4 border-orange-500 p-6 mb-8">
          <div className="bg-orange-500 text-black px-4 py-2 border-2 border-yellow-400 mb-6 inline-block">
            <h2 className="text-xl font-bold">ACHIEVEMENTS UNLOCKED</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-400 text-black p-4 border-2 border-orange-500 text-center">
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-bold text-sm">EDUCATION COMPLETE</div>
              <div className="text-xs mt-1">Computer Science Degree</div>
            </div>
            <div className="bg-yellow-400 text-black p-4 border-2 border-orange-500 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-bold text-sm">PROJECT MASTER</div>
              <div className="text-xs mt-1">50+ Projects Completed</div>
            </div>
            <div className="bg-yellow-400 text-black p-4 border-2 border-orange-500 text-center">
              <div className="text-2xl mb-2">🌟</div>
              <div className="font-bold text-sm">TEAM PLAYER</div>
              <div className="text-xs mt-1">Cross-functional Collaboration</div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-yellow-400 text-black px-6 py-3 border-4 border-orange-500 inline-block mb-4">
            <h3 className="text-lg font-bold">READY TO START A NEW QUEST?</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-500 hover:bg-yellow-400 text-black border-2 border-yellow-400 hover:border-orange-500 font-bold px-6 py-3">
              VIEW MY PROJECTS
            </Button>
            <Button className="bg-yellow-400 hover:bg-orange-500 text-black border-2 border-orange-500 hover:border-yellow-400 font-bold px-6 py-3">
              LET'S CONNECT
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
