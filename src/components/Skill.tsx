import React, { useEffect, useRef, useState } from 'react';
import GradientText from './GradientText';

interface SkillCategory {
  title: string;
  description: string;
  capabilities: string[];
}

interface Skill {
  name: string;
  icon: string;
}

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'HTML', icon: '/html.svg' },
    { name: 'CSS3', icon: '/css.svg' },
    { name: 'JavaScript', icon: '/js.svg' },
    { name: 'TypeScript', icon: '/ts.svg' },
    { name: 'PHP', icon: '/php.svg' },
    { name: 'Python', icon: '/python.svg' },
    { name: 'NodeJS', icon: '/nodejs.svg' },
    { name: 'Laravel', icon: '/laravel.svg' },
    { name: 'React', icon: '/react.svg' },
    { name: 'Angular', icon: '/angular.svg' },
    { name: 'NextJS', icon: '/nextjs.svg' },
    { name: 'MongoDB', icon: '/mongo.svg' },
    { name: 'Tailwind CSS', icon: '/tailwind.svg' },
    { name: 'Github', icon: '/github.svg' },
  ];

  useEffect(() => {
    const scrollContainer = skillsRef.current;
    if (!scrollContainer) return;

    // Clone items for infinite scroll effect
    const skillsContent = scrollContainer.querySelector('.skills-content') as HTMLElement;
    if (!skillsContent) return;

    const clone = skillsContent.cloneNode(true) as HTMLElement;
    clone.style.marginLeft = '2rem';
    scrollContainer.appendChild(clone);

    let animationId: number | null = null;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed here

    // Animation function
    const animate = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Reset position when first set of items is fully scrolled
      if (scrollPosition >= skillsContent.offsetWidth) {
        // Smoothly reset to beginning
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const handleMouseLeave = () => {
      if (animationId === null) {
        animationId = requestAnimationFrame(animate);
      }
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Web Development",
      description: "Full-stack web development with modern technologies",
      capabilities: [
        "Frontend development with React & Next.js",
        "UI design with Tailwind CSS , Boostrap",
        "Backend with Node.js & Laravel & Python Flask",
        "RESTful API development",
        "Database: MongoDB & MySQL",
        "Performance optimization"
      ]
    },
    {
      title: "AI & Data",
      description: "Basic AI integration and data processing",
      capabilities: [
        "Integration of AI services and APIs into applications",
        "Basic machine learning model implementation",
        "Data processing and analysis with Python",
        "Data visualization and reporting",
        "Building data-driven features for applications"
      ]
    },
  ];

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={4}
          showBorder={false}
          className="custom-class text-5xl font-medium"
        >
          Skills
        </GradientText>

        <div
          ref={skillsRef}
          className="overflow-hidden mt-3 whitespace-nowrap relative cursor-pointer bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-6"
          style={{ height: '120px' }}
        >
          <div className="skills-content inline-block px-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="inline-block mx-8 transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-3"
              >
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg mb-3 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                    <img
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      className="h-14 w-14 object-contain filter drop-shadow-lg"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300 tracking-wide">{skill.name}</span>
                </div>
              </div>
            ))}
            <div className="inline-block w-16">
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-4">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-gray-600/50"
            >
              <button
                onClick={() => toggleCategory(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors duration-300"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{category.description}</p>
                </div>
                <span
                  className={`transform transition-transform duration-300 ${
                    activeCategory === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeCategory === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 bg-black/20">
                  <ul className="space-y-3">
                    {category.capabilities.map((capability, capIndex) => (
                      <li
                        key={capIndex}
                        className="flex items-start gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <span className="text-[#40ffaa] mt-1">•</span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;