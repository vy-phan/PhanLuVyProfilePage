import React, { useState, useEffect } from 'react';

const Menu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);

  const menuItems = [
    { id: 'home', label: 'Home', englishLabel: 'Home' },
    { id: 'about', label: 'About', englishLabel: 'About' },
    { id: 'projects', label: 'Project', englishLabel: 'Projects' },
    { id: 'achievements', label: 'Achievement', englishLabel: 'Achievements' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra vị trí scroll, nếu > 50px thì đánh dấu là đã scroll
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Tự động cập nhật active menu dựa trên vị trí scroll
      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Thêm offset để menu item được kích hoạt sớm hơn
      
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveItem(menuItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, menuItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveItem(sectionId);
  };

  return (
    <div 
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black bg-opacity-60 backdrop-blur-sm shadow-lg' 
          : 'bg-black bg-opacity-95'
      } text-white rounded-full px-8 py-4 flex justify-center items-center max-w-xl mx-auto`}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <button
            onClick={() => scrollToSection(item.id)}
            className={`px-4 py-1 mx-2 transition-all duration-300 ${
              activeItem === item.id ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {item.label}
          </button>
          {index < menuItems.length - 1 && (
            <span className="text-gray-600 select-none">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Menu;