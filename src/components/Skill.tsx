import React, { useState, useEffect } from 'react';
import GradientText from './GradientText';
import SkillDesktop from './SkillDesktop';
import SkillMobile from './Skillmobile';


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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Skills data
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

  // Skill categories data
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
      <div className="container mx-auto px-4">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={4}
          showBorder={false}
          className="custom-class text-4xl sm:text-5xl font-medium"
        >
          Skills
        </GradientText>

        {isMobile ? (
          <SkillMobile skills={skills} skillCategories={skillCategories} />
        ) : (
          <SkillDesktop skills={skills} skillCategories={skillCategories} />
        )}
      </div>
    </section>
  );
};

export default Skills;