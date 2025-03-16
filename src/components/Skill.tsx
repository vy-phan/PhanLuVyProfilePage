import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  icon: string;
}

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'HTML5', icon: '/public/html.svg' },
    // { name: 'CSS3', icon: '/path/to/css3.svg' },
    // { name: 'JavaScript', icon: '/path/to/javascript.svg' },
    // { name: 'PHP', icon: '/path/to/php.svg' },
    // { name: 'Python', icon: '/path/to/python.svg' },
    // { name: 'TypeScript', icon: '/path/to/typescript.svg' },
    // { name: 'NodeJS', icon: '/path/to/nodejs.svg' },
    // { name: 'Laravel', icon: '/path/to/laravel.svg' },
    // { name: 'React', icon: '/path/to/react.svg' },
    // { name: 'Angular', icon: '/path/to/angular.svg' },
    // { name: 'NextJS', icon: '/path/to/nextjs.svg' },
    // { name: 'Ollama', icon: '/path/to/ollama.svg' },
    // { name: 'Tailwind CSS', icon: '/path/to/tailwindcss.svg' },
    // { name: 'Bootstrap', icon: '/path/to/bootstrap.svg' },
  ];

  useEffect(() => {
    const scrollContainer = skillsRef.current;
    if (!scrollContainer) return;

    // Clone items for infinite scroll effect
    const skillsContent = scrollContainer.querySelector('.skills-content');
    if (!skillsContent) return;
    
    const clone = skillsContent.cloneNode(true);
    scrollContainer.appendChild(clone);

    // Animation function
    const animate = () => {
      if (!scrollContainer) return;
      
      if (scrollContainer.scrollLeft >= skillsContent.scrollWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => requestAnimationFrame(animate);

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-10">My Skills</h2>
        
        <div 
          ref={skillsRef}
          className="overflow-hidden whitespace-nowrap relative cursor-pointer"
          style={{ height: '80px' }}
        >
          <div className="skills-content inline-block">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="inline-block mx-6 transition-transform hover:scale-110"
              >
                <div className="flex flex-col items-center">
                  <img 
                    src={skill.icon} 
                    alt={`${skill.name} logo`} 
                    className="h-12 w-auto" 
                  />
                  <span className="text-xs text-gray-300 mt-2">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;