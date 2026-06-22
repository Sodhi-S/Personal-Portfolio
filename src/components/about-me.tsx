import { Card } from "@/components/ui/card"

export function AboutMe() {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2">&gt; PLAYER PROFILE...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">CHARACTER SELECT</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Character Stats */}
          <Card className="bg-black border-4 border-yellow-400 p-8 flex flex-col justify-center h-full relative pt-20">
            <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-orange-500 mb-6 rounded-md text-center absolute left-1/2 -translate-x-1/2 top-8 w-max z-10">
              <h2 className="text-[10px] md:text-xs font-bold tracking-wide">CHARACTER STATS</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">NAME:</span>
                <span className="text-yellow-400">Sahej Sodhi</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">CLASS:</span>
                <span className="text-orange-500">Data / Software Engineer</span>
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
              <h2 className="text-[10px] md:text-xs font-bold tracking-wide">MY QUEST</h2>
            </div>
            <div className="text-white space-y-4 leading-relaxed mt-4">
              <p>
                An aspiring Data Engineer studying Systems Design Engineering, my experience spans from:
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
      </div>
    </section>
  )
}