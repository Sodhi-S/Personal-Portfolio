import { WORK_EXPERIENCES } from "@/data/experience"

export function ExperienceSection() {
  return (
    <section className="no-pixel py-24 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-orange-500 text-sm font-bold tracking-wider mb-2">&gt; BOSS BATTLES CLEARED...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">QUEST LOG</h2>
          <p className="text-white max-w-2xl mx-auto">
            Bosses Defeated
          </p>
        </div>

        <div className="space-y-6">
          {[...WORK_EXPERIENCES].reverse().map((exp, index) => (
            <div
              key={index}
              className="p-6 bg-yellow-400 border-4 border-orange-500 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-black tracking-wider">{exp.company}</h3>
                  <div className="text-sm font-bold text-orange-600">{exp.role}</div>
                </div>
                <div className="px-2 py-1 bg-black text-white text-xs font-bold border-2 border-orange-500 whitespace-nowrap">
                  {exp.dates}
                </div>
              </div>
              <div className="text-xs font-bold text-black/70 mb-3">📍 {exp.location}</div>
              <p className="text-black text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
