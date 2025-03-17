
import React, { useState } from 'react';

interface SkillCategory {
  title: string;
  description: string;
  capabilities: string[];
}

interface Skill {
  name: string;
  icon: string;
}

interface SkillMobileProps {
  skills: Skill[];
  skillCategories: SkillCategory[];
}

const SkillMobile: React.FC<SkillMobileProps> = ({ skills, skillCategories }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <>
      {/* Mobile Skills Grid */}
      <div className="grid grid-cols-3 gap-3 mt-3 bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center transition-all duration-300 hover:scale-105"
          >
            <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg mb-2 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <img
                src={skill.icon}
                alt={`${skill.name} logo`}
                className="h-8 w-8 object-contain filter drop-shadow-lg"
              />
            </div>
            <span className="text-xs font-medium text-gray-300 tracking-wide text-center">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Mobile Skill Categories */}
      <div className="mt-8 space-y-3">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-gray-600/50"
          >
            <button
              onClick={() => toggleCategory(index)}
              className="w-full px-4 py-3 flex flex-col justify-between text-left hover:bg-gray-800/50 transition-colors duration-300 gap-1"
            >
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white">{category.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{category.description}</p>
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
              <div className="px-4 py-3 bg-black/20">
                <ul className="space-y-2">
                  {category.capabilities.map((capability, capIndex) => (
                    <li
                      key={capIndex}
                      className="flex items-start gap-2 text-xs text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <span className="text-[#40ffaa] mt-0.5 flex-shrink-0">•</span>
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

export default SkillMobile;
