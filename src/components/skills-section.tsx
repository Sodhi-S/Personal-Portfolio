export function SkillsSection() {
  const skillCategories = [
    {
      title: "DATA SCIENCE",
      icon: "📊",
      skills: [
        { name: "Python", level: 95 },
        { name: "Machine Learning", level: 90 },
        { name: "Deep Learning", level: 85 },
        { name: "Statistics", level: 88 },
        { name: "Data Visualization", level: 92 },
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
        { name: "Git/GitHub", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS/GCP", level: 78 },
        { name: "Jupyter/Colab", level: 92 },
        { name: "Linux/Unix", level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2">&gt; POWER-UP SKILLS...</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">POWER-UPS & ABILITIES</h2>
          <p className="text-white max-w-2xl mx-auto">
            Each skill block collected through countless coding adventures and data quests.
          </p>
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
