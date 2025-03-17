import { useState } from 'react';
import GradientText from './GradientText';

interface Achievement {
    title: string;
    description: string;
    date: string;
    icon?: string;
}

interface Activity {
    title: string;
    description: string;
    image: string;
}

const Achievement = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const achievements: Achievement[] = [
        {
            title: 'Second Prize - Web Design Challenge ',
            description: 'CLB ITE - 2025',
            date: '2025',
            icon: '🥈'
        },
        {
            title: 'First Prize - Web Design Challenge',
            description: 'CLB ITE - 2024',
            date: '2024',
            icon: '🏆'
        },
        {
            title: 'Student Scholarship',
            description: 'Academic Excellence 2023-2024',
            date: '2023-2024',
            icon: '🎓'
        }
    ];

    const activities: Activity[] = [
        {
            title: '🏆 Second Prize - Web Design Challenge',
            description: 'Showcasing innovative web design solutions',
            image: '/PhanLuVyProfilePage/bia4.jpg'
        },
        {
            title: '🎤 Software Project Talk Show',
            description: 'Sharing innovative software ideas and solutions with the community',
            image: '/PhanLuVyProfilePage/bia2.jpg'
        },
        {
            title: '🔔 Golden Bell Challenge - IT Edition',
            description: 'Competitive IT knowledge quiz competition showcasing technical expertise',
            image: '/PhanLuVyProfilePage/bia3.jpg'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activities.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + activities.length) % activities.length);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <GradientText
                colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
                animationSpeed={4}
                showBorder={false}
                className="text-5xl font-medium mb-12"
            >
                Achievements & Activities
            </GradientText>

            <div className="grid md:grid-cols-1 gap-8 mb-16">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 shadow-lg hover:shadow-purple-500/10">
                    <div className="flex">
                        <div className="flex-1 pr-6 border-r border-gray-700/50">
                            {achievements.slice(0, 2).map((achievement, index) => (
                                <div key={index} className="mb-6 last:mb-0 group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl">{achievement.icon}</span>
                                        <h3 className="text-xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-[#40ffaa] group-hover:to-[#4079ff] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{achievement.title}</h3>
                                    </div>
                                    <p className="text-gray-400 mb-2 group-hover:text-[#40ffaa] transition-all duration-300">{achievement.description}</p>
                                    <p className="text-sm text-gray-500 group-hover:text-[#4079ff] transition-all duration-300">{achievement.date}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 pl-6">
                            {achievements.slice(2).map((achievement, index) => (
                                <div key={index} className="mb-6 last:mb-0 group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl">{achievement.icon}</span>
                                        <h3 className="text-xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-[#40ffaa] group-hover:to-[#4079ff] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{achievement.title}</h3>
                                    </div>
                                    <p className="text-gray-400 mb-2 group-hover:text-[#40ffaa] transition-all duration-300">{achievement.description}</p>
                                    <p className="text-sm text-gray-500 group-hover:text-[#4079ff] transition-all duration-300">{achievement.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 border border-gray-700/50">
                <h3 className="text-2xl font-semibold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">Recent Activities</h3>

                <div className="relative h-[600px] md:h-[500px] overflow-hidden rounded-lg max-w-[1200px] mx-auto">
                    <div
                        className="flex transition-transform duration-500 h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="min-w-full h-full relative group"
                            >
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 transition-opacity duration-300 group-hover:opacity-90">
                                    <h4 className="text-2xl font-semibold mb-3">{activity.title}</h4>
                                    <p className="text-gray-300 text-lg">{activity.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                >
                    →
                </button>

                <div className="flex justify-center mt-6 gap-3">
                    {activities.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievement;