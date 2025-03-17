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
    { name: 'HTML', icon: '/PhanLuVyProfilePage/html.svg' },
    { name: 'CSS3', icon: '/PhanLuVyProfilePage/css.svg' },
    { name: 'JavaScript', icon: '/PhanLuVyProfilePage/js.svg' },
    { name: 'TypeScript', icon: '/PhanLuVyProfilePage/ts.svg' },
    { name: 'PHP', icon: '/PhanLuVyProfilePage/php.svg' },
    { name: 'Python', icon: '/PhanLuVyProfilePage/python.svg' },
    { name: 'NodeJS', icon: '/PhanLuVyProfilePage/nodejs.svg' },
    { name: 'Laravel', icon: '/PhanLuVyProfilePage/laravel.svg' },
    { name: 'React', icon: '/PhanLuVyProfilePage/react.svg' },
    { name: 'Angular', icon: '/PhanLuVyProfilePage/angular.svg' },
    { name: 'NextJS', icon: '/PhanLuVyProfilePage/nextjs.svg' },
    { name: 'MongoDB', icon: '/PhanLuVyProfilePage/mongo.svg' },
    { name: 'Tailwind CSS', icon: '/PhanLuVyProfilePage/tailwind.svg' },
    { name: 'Github', icon: '/PhanLuVyProfilePage/github.svg' },
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
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /iphone|ipod|ipad|android|blackberry|windows phone/i.test(userAgent);
      setIsMobile(width < 768 || isMobileDevice); // Check both width and device type
    };
    
    // Run initial check immediately
    checkIsMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIsMobile, { passive: true });
    
    // Force a check after a short delay to ensure proper detection
    const timeoutId = setTimeout(checkIsMobile, 100);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timeoutId);
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