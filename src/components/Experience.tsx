import React, { useState, useEffect } from 'react';
import GradientText from './GradientText';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const Experience: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Experience data
  const experiences: ExperienceItem[] = [
    {
      title: "Teaching Assistant",
      company: "ITE Club In ITC",
      period: "08/2024 - 10/2024",
      description: [
        "Provided support in teaching SQL fundamentals to 30 club members",
        "Designed and developed web applications for practical learning",
        "Created exercises and assignments to reinforce learning concepts",
        "Offered direct guidance and addressed questions from members",
        "Facilitated hands-on workshops for practical skill development"
      ]
    }
  ];

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard tablet breakpoint
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <section className="py-16">
      <div className={`container mx-auto px-4 ${isMobile ? 'space-y-6' : 'space-y-8'}`}>
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={4}
          showBorder={false}
          className="custom-class text-4xl sm:text-5xl font-medium mb-8"
        >
          Work Experience
        </GradientText>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 transform hover:scale-[1.01]"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-gray-300 mt-1">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-1 rounded-full text-sm font-medium text-gray-200 border border-purple-500/30">
                    {exp.period}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-2 mt-4">
                {exp.description.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex items-start gap-2 text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-[#40ffaa] mt-1 flex-shrink-0">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;