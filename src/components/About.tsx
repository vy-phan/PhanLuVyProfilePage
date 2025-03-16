import React from 'react';
import GradientText from './GradientText';

interface EducationItem {
    school: string;
    degree: string;
    period: string;
    gpa: string;
}

interface CareerGoal {
    title: string;
    description: string;
}

const About: React.FC = () => {
    const educationItems: EducationItem[] = [
        {
            school: 'Information Technology College (ITC) - Ho Chi Minh City',
            degree: 'Bachelor',
            period: '8/2023 - 11/2025',
            gpa: '3.8/4.0',
        },
    ];

    const careerGoals: CareerGoal[] = [
        {
            title: 'Short-term Goal: Full Stack Developer',
            description: 'Develop comprehensive skills in both Front-end and Back-end technologies, with a focus on modern frameworks like React, Node.js, and cloud services. Aim to build scalable and efficient web applications while staying current with industry best practices.',
        },
        {
            title: 'Long-term Goal: Technical Lead',
            description: 'Evolve into a technical leadership role where I can architect complex systems, mentor junior developers, and drive technological innovation. Focus on developing strong project management skills and deep technical expertise to lead high-performing development teams.',
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto py-12">
            <div className="mb-12 text-center">
                <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={4}
                    showBorder={false}
                    className="custom-class text-3xl"
                >
                    About me
                </GradientText>
                <p className="text-gray-400 max-w-3xl mx-auto">
                    I am a Web Developer passionate about technology, website optimization, and implementing LLM and AI solutions in real-world applications.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Education Section */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl transform transition-all duration-300 hover:shadow-purple-500/10 hover:-translate-y-1">
                    <h2 className="text-3xl font-bold mb-6 text-white">Education</h2>
                    <div className="space-y-8">
                        {educationItems.map((item, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-purple-500 py-2">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                                <h3 className="text-xl font-semibold text-white">{item.school}</h3>
                                <p className="text-gray-300">{item.degree}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-400 text-sm">{item.period}</span>
                                    <span className="text-purple-400 font-medium">GPA: {item.gpa}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Career Goals Section */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl transform transition-all duration-300 hover:shadow-teal-500/10 hover:-translate-y-1">
                    <h2 className="text-3xl font-bold mb-6 text-white">Career Goals</h2>
                    <div className="space-y-6">
                        {careerGoals.map((goal, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 transform transition-all duration-300 hover:border-teal-500/30 hover:scale-[1.02]"
                            >
                                <h3 className="text-xl font-semibold text-teal-400 mb-2">{goal.title}</h3>
                                <p className="text-gray-300">{goal.description}</p>
                            </div>
                        ))}
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default About;