import { Card } from "@/components/ui/card"

export function AboutMe() {
  const skillCategories = [
    {
      title: "DATA SCIENCE",
      icon: "📊",
      skills: [
        { name: "Python", level: 95 },
        { name: "Statistics", level: 93 },
        { name: "Machine Learning", level: 92 },
        { name: "Data Visualization", level: 92 },
        { name: "Deep Learning", level: 90 },
      ],
    },
    {
      title: "SOFTWARE DEV",
      icon: "💻",
      skills: [
        { name: "JavaScript/TypeScript", level: 93 },
        { name: "React/Next.js", level: 90 },
        { name: "Node.js", level: 87 },
        { name: "SQL/NoSQL", level: 85 },
        { name: "Cloud Platforms", level: 82 },
      ],
    },
    {
      title: "TOOLS & TECH",
      icon: "🛠️",
      skills: [
        { name: "Docker", level: 80 },
        { name: "AWS/GCP", level: 78 },
        { name: "Jupyter/Colab", level: 92 },
      ],
    },
  ]


  return (
    
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2">&gt; POWER UP SKILLS...</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">POWER-UPS & ABILITIES</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16">
          {/* Character Stats */}
          <Card className="bg-black border-4 border-yellow-400 p-8 flex flex-col justify-center h-full relative pt-20">
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-orange-500 mb-6 rounded-md text-center absolute left-1/2 -translate-x-1/2 top-8 w-max z-10">
              <h2 className="text-xl font-bold tracking-wide">CHARACTER STATS</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">NAME:</span>
                <span className="text-yellow-400">Sahej Sodhi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">CLASS:</span>
                <span className="text-orange-500">Data Scientist / Developer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">HOMEBASE:</span>
                <span className="text-yellow-400">University of Waterloo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">LEVEL:</span>
                <span className="text-orange-400">3rd Year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">LOCATION:</span>
                <span className="text-yellow">Toronto, Canada</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">SPECIAL POWER:</span>
                <span className="text-yellow">Best Music Taste</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">FAVO(U)RITE DRINK:</span>
                <span className="text-yellow">COKE ZERO</span>
              </div>
            </div>
          </Card>

          {/* My Quest */}
          <Card className="bg-black border-4 border-yellow-400 p-8 flex flex-col justify-center h-full relative pt-20">
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-orange-500 mb-6 rounded-md text-center absolute left-1/2 -translate-x-1/2 top-8 w-max z-10">
              <h2 className="text-xl font-bold tracking-wide">MY QUEST</h2>
            </div>
            <div className="text-white space-y-4 leading-relaxed mt-4">
              <p>
                An aspiring SWE / Data Scientist studying Systems Design Engineering, my experience spans from:
              </p>

              <p>
              - Small-scale projects
              </p>

              <p>
              - End-to-end projects
              </p>

              <p>
              - Working for startup companies.
              </p>

              <p>
                When I'm not working, you can find me in the gym pumping some iron, playing video games with my friends, or arguing about basketball.
              </p>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="p-6 bg-yellow-400 border-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="text-2xl mr-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-black tracking-wider">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black font-medium">{skill.name}</span>
                      <span className="text-black font-bold">LV.{skill.level}</span>
                    </div>
                    {/* Mario-style progress bar */}
                    <div className="relative">
                      <div className="w-full bg-black h-4 border-2 border-orange-500">
                        <div
                          className="bg-orange-500 h-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}