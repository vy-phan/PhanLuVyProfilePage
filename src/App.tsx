import Menu from "./components/Menu"
import Particles from "./components/Particles"
import Project from "./components/Project"
import TextPressure from "./components/TextPressure"
import About from "./components/About"
import Skills from "./components/Skill"

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 py-4">
        <Menu />
      </header>
      <main className="container mx-auto px-4 py-8">
        <section id="home" className="h-screen w-full relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Particles className="w-full h-full" />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full w-full">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-8 px-4">
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-lg shadow-purple-500/20 transition-transform hover:scale-105 duration-300">
                  <img
                    src="/avatar.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-start">
                {/* <div style={{ position: 'relative', height: '300px' }}> */}
                <TextPressure
                  text="Phan Lu Vy"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#fff"
                  strokeColor="#ff0000"
                  minFontSize={36}
                />
                {/* </div> */}
                <p className="text-xl text-gray-300 text-center md:text-left">
                  Web Developer
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          <About />
          {/* <Skills /> */}
        </section>


        <section id="projects" className="min-h-screen flex items-center justify-center">
          <Project />
        </section>

        <section id="achievements" className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center">Thành tựu</h1>
        </section>
      </main>
    </div>
  )
}

export default App
