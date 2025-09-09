import { Button } from "@/components/ui/button"

export function ProjectsSection() {
  const projects = [
    {
      title: "This Website",
      description: "I mean isn't this kind of a project ??? I'd consider it to be",
      tech: ["TypeScript", "Next.js", "Shadcn", "Tailwind CSS"],
      status: "COMPLETED",
      difficulty: "★★★☆☆",
      achievement: "⚡",
      link: "https://github.com/Sodhi-S/Fake-News-Detection",
    },
    {
      title: "SPEECH EMOTION RECOGNITION",
      description: "Neural network trained to detect emotions in speech",
      tech: ["Python", "Pandas", "Librosa", "Numpy", "Keras"],
      status: "COMPLETED",
      difficulty: "★★★☆☆",
      achievement: "🏆",
      link: "https://github.com/Sodhi-S/Speech-Emotion-Recognition",
    },
    {
      title: "GO PHISH",
      description: "Phishing email detection chrome extension + AI based detection",
      tech: ["Python", "TypeScript", "React" , "Scikit-learn", "Django Rest Framework"],
      status: "COMPLETED",
      difficulty: "★★★★★",
      achievement: "💎",
      link: "https://github.com/achow111/go-phish-",
    },
    {
      title: "Credit Card Fraud Detection",
      description: "Credit card fraud detection using machine learning",
      tech: ["Python", "Pandas", "Scikit Learn", "MatPlotLib"],
      status: "COMPLETED",
      difficulty: "★★★☆☆",
      achievement: "🥈",
      link: "https://github.com/Sodhi-S/CreditCard_Fraud_Detection",
    },
    {
      title: "STATSANITY",
      description: "NBA statistics prediction using neural networks :)",
      tech: ["Python", "PyTorch", "BeautifulSoup" , "Selenium"],
      status: "IN PROGRESS",
      difficulty: "★★★★☆",
      achievement: "😝",
      link: "https://github.com/Sodhi-S/NBA-Statistics-Prediction",
    },
    {
      title: "FAKE NEWS DETECTION",
      description: "This is kinda how I started learning Pandas",
      tech: ["Python", "Pandas", "SciKit Learn", "Jupyter Notebook"],
      status: "COMPLETED",
      difficulty: "★★★★★",
      achievement: "⚡",
      link: "https://github.com/Sodhi-S/Fake-News-Detection",
    },
  ]

  return (
    <section id="projects" className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-orange-500 text-sm font-bold tracking-wider mb-2">&gt; LEVEL SELECT...</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">COMPLETED WORLDS</h2>
          <p className="text-white max-w-2xl mx-auto">
            Adventures completed in the kingdoms of data science and software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-yellow-400 border-4 border-orange-500 hover:scale-105 transition-all duration-300 cursor-pointer group relative"
            >
              <div className="absolute top-4 right-4 text-lg text-black">{project.achievement}</div>

              <div
                className={`inline-block px-2 py-1 text-xs font-bold mb-4 border-2 ${
                  project.status === "COMPLETED"
                    ? "bg-orange-500 text-black border-black"
                    : project.status === "IN PROGRESS"
                      ? "bg-black text-white border-orange-500"
                      : "bg-black text-white border-yellow-400"
                }`}
              >
                {project.status}
              </div>

              <h3 className="text-lg font-bold text-black mb-3">{project.title}</h3>

              <p className="text-black text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-black font-bold">DIFFICULTY:</span>
                <span className="text-black text-sm font-bold">{project.difficulty}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-black text-white text-xs font-bold border border-orange-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    size="sm"
                    className="w-full text-xs font-bold bg-orange-500 hover:bg-orange-600 text-black border-2 border-black"
                  >
                    VIEW PROJECT
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
