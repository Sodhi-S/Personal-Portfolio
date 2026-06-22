import { skillCategories } from "@/data/skills"

export function SkillsSection() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2">&gt; POWER-UP SKILLS...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">POWER-UPS & ABILITIES</h2>
          <p className="text-white max-w-2xl mx-auto">
            Skills Progress
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="p-6 bg-yellow-400 border-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="text-2xl mr-3">{category.icon}</div>
                <h3 className="text-xs md:text-sm font-bold text-black tracking-wider leading-relaxed">{category.title}</h3>
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
