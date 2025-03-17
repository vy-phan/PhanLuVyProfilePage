

import React, { useEffect, useRef, useState } from 'react';

interface SkillCategory {
  title: string;
  description: string;
  capabilities: string[];
}

interface Skill {
  name: string;
  icon: string;
}

interface SkillDesktopProps {
  skills: Skill[];
  skillCategories: SkillCategory[];
}

const SkillDesktop: React.FC<SkillDesktopProps> = ({ skills, skillCategories }) => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

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

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <>
      {/* Desktop Skills Carousel */}
      <div
        ref={skillsRef}
        className="overflow-hidden mt-3 whitespace-nowrap relative cursor-pointer bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-4 sm:p-6"
        style={{ height: 'auto', minHeight: '100px', maxHeight: '160px' }}
      >
        <div className="skills-content inline-block px-4 sm:px-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-block mx-4 sm:mx-8 transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-3"
            >
              <div className="flex flex-col items-center">
                <div className="p-2 sm:p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg mb-2 sm:mb-3 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <img
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    className="h-10 w-10 sm:h-14 sm:w-14 object-contain filter drop-shadow-lg"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide">{skill.name}</span>
              </div>
            </div>
          ))}
          <div className="inline-block w-16">
          </div>
        </div>
      </div>

      {/* Desktop Skill Categories */}
      <div className="mt-16 space-y-4">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-gray-600/50"
          >
            <button
              onClick={() => toggleCategory(index)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between text-left hover:bg-gray-800/50 transition-colors duration-300 gap-2 sm:gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{category.title}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2 sm:line-clamp-1">{category.description}</p>
              </div>
              <span
                className={`transform transition-transform duration-300 text-gray-400 ${activeCategory === index ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${activeCategory === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-black/20">
                <ul className="space-y-2 sm:space-y-3">
                  {category.capabilities.map((capability, capIndex) => (
                    <li
                      key={capIndex}
                      className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <span className="text-[#40ffaa] mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                      <span className="flex-1">{capability}</span>
                    </li>
                  ))}  
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillDesktop;
