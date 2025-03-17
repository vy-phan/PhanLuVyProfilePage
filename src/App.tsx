import React, { useState, useEffect, lazy, Suspense, ReactNode } from "react"
import Menu from "./components/Menu"
import Particles from "./components/Particles"
import TextPressure from "./components/TextPressure"
import ShinyText from "./components/ShinyText"

// Error Boundary component for handling lazy loading errors
class ErrorBoundary extends React.Component<{children: ReactNode, fallback?: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode, fallback?: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="text-red-500 p-4">Something went wrong loading this section.</div>;
    }
    return this.props.children;
  }
}

// Lazy load components
const About = lazy(() => import("./components/About"))
const Skills = lazy(() => import("./components/Skill"))
const Experience = lazy(() => import("./components/Experience"))
const Project = lazy(() => import("./components/Project"))
const Achievement = lazy(() => import("./components/Achievement"))

// Define types for section visibility state
interface SectionVisibility {
  home: boolean;
  about: boolean;
  skills: boolean;
  experience: boolean;
  projects: boolean;
  achievements: boolean;
}

function App() {
  // State to track which sections are visible
  const [visibleSections, setVisibleSections] = useState<SectionVisibility>({
    home: true,
    about: false,
    skills: false,
    experience: false,
    projects: false,
    achievements: false
  })

  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (element: HTMLElement | null): boolean => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      )
    }

    // Function to update visible sections with throttling for performance
    let ticking = false;
    let updatedVisibility: Partial<SectionVisibility> = {};
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections: Record<keyof SectionVisibility, HTMLElement | null> = {
            home: document.getElementById("home"),
            about: document.getElementById("about"),
            skills: document.getElementById("skills"),
            experience: document.getElementById("experience"),
            projects: document.getElementById("projects"),
            achievements: document.getElementById("achievements")
          }

          updatedVisibility = {}
          for (const [key, element] of Object.entries(sections)) {
            updatedVisibility[key as keyof SectionVisibility] = isInViewport(element)
          }
          
          setVisibleSections(prev => {
            // Only update state if there's a change to prevent unnecessary renders
            if (JSON.stringify(prev) !== JSON.stringify(updatedVisibility)) {
              return {...updatedVisibility as SectionVisibility}
            }
            return prev
          })
          
          ticking = false;
        });
        ticking = true;
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Loading spinner component
  const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  )
  
  // Error fallback component
  const ErrorFallback: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-64 text-red-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p>Failed to load this section. Please refresh the page.</p>
    </div>
  )

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
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-transparent shadow-lg shadow-purple-500/20 transition-transform hover:scale-105 duration-300 before:content-[''] before:absolute before:-inset-1 before:rounded-full before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-blue-500 before:animate-spin-slow before:z-[-1]">
                  <img
                    src="/avatar.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center md:items-start">
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
                <p className="text-xl text-gray-300 text-center md:text-left">
                  Web Developer{" "} <br/>
                  <ShinyText text="phanvy1410205@gmail.com" disabled={false} speed={5} />
                </p>
                <div className="flex gap-6 mt-4">
                  <a
                    href="https://github.com/vy-phan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    title="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/vy.phan.779392"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    title="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href="https://zalo.me/0767624139"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    title="Zalo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48">
                      <path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path><path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path><path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path><path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path><path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path><path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="min-h-screen py-16 flex flex-col gap-16">
          <div id="about-section" className="flex items-center justify-center">
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<LoadingSpinner />}>
                {visibleSections.about && <About />}
              </Suspense>
            </ErrorBoundary>
          </div>
          
          <div id="skills" className="flex items-center justify-center">
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<LoadingSpinner />}>
                {visibleSections.skills && <Skills />}
              </Suspense>
            </ErrorBoundary>
          </div>
          
          <div id="experience" className="flex items-center justify-center">
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<LoadingSpinner />}>
                {visibleSections.experience && <Experience />}
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<LoadingSpinner />}>
              {visibleSections.projects && <Project />}
            </Suspense>
          </ErrorBoundary>
        </section>

        <section id="achievements" className="min-h-screen flex items-center justify-center">
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<LoadingSpinner />}>
              {visibleSections.achievements && <Achievement />}
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  )
}

export default App