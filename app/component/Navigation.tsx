'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Home, Briefcase, Laptop, GraduationCap, Code, Mail } from 'lucide-react';
import { useTheme } from '../common/ThemeContext';

function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const { isTransitioning } = useTheme();
  const scrollLock = useRef(false);
  const mobileNavRef = useRef(null);
  const resizeObserver = useRef(null);

  const navItems = [
    { id: 'hero', label: 'HOME', icon: <Home size={18} /> },
    { id: 'education', label: 'EDUCATION', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'SKILLS', icon: <Code size={18} /> },
    { id: 'projects', label: 'PROJECTS', icon: <Laptop size={18} /> },
    { id: 'work', label: 'EXPERIENCE', icon: <Briefcase size={18} /> },
    { id: 'contact', label: 'CONTACT', icon: <Mail size={18} /> },
  ];

  // Simplified scroll handler with intersection observer
  const updateActiveSection = useCallback(() => {
    if (scrollLock.current) return;

    const sections = navItems.map(item => document.getElementById(item.id));
    const visibleSections = sections.filter(section => {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    });

    if (visibleSections.length > 0) {
      const topSection = visibleSections.reduce((prev, current) => 
        prev.getBoundingClientRect().top < current.getBoundingClientRect().top ? prev : current
      );
      setActiveSection(topSection.id);
    }
  }, [navItems]);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (!scrollLock.current) {
      requestAnimationFrame(updateActiveSection);
    }
  }, [updateActiveSection]);

  // Improved scroll-to-section with momentum handling
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (!element) return;

    scrollLock.current = true;
    setActiveSection(id);

    const isMobile = window.innerWidth <= 768;
    const navHeight = mobileNavRef.current?.offsetHeight || 0;
    const offset = isMobile ? navHeight + 20 : 80;

    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: 'smooth'
    });

    // Handle momentum scroll on iOS
    let lastScrollPosition = window.scrollY;
    const momentumCheck = setInterval(() => {
      if (Math.abs(window.scrollY - lastScrollPosition) < 1) {
        clearInterval(momentumCheck);
        scrollLock.current = false;
        updateActiveSection();
      }
      lastScrollPosition = window.scrollY;
    }, 100);

    // Fallback unlock
    setTimeout(() => {
      scrollLock.current = false;
      clearInterval(momentumCheck);
    }, 2000);
  }, [updateActiveSection]);

  // Setup event listeners and observers
  useEffect(() => {
    const passiveOptions = { passive: true };
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !scrollLock.current) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Handle resize events with observer
    resizeObserver.current = new ResizeObserver(() => {
      updateActiveSection();
    });
    resizeObserver.current.observe(document.documentElement);

    window.addEventListener('scroll', handleScroll, passiveOptions);

    return () => {
      observer.disconnect();
      resizeObserver.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, navItems, updateActiveSection]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] bg-[var(--background-color)] backdrop-blur-[10px] border-b border-[rgba(255,255,255,0.1)] select-none ${isTransitioning ? 'animate-smoothTransition' : ''} hidden md:block`}>
        <div className="h-[50px] max-w-[1200px] mx-auto px-8 py-4 flex justify-center items-center relative">
          <div className="flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`bg-transparent border-none text-[var(--text-color)] text-base font-bold cursor-pointer py-2 px-4 rounded-md transition-all duration-300 relative font-mono
                ${activeSection === item.id ? 'opacity-100 after:w-full' : 'opacity-70 hover:opacity-100 hover:after:w-full after:w-0'} 
                after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-[var(--text-color)] after:transition-all after:duration-300 after:-translate-x-1/2`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav 
        ref={mobileNavRef}
        className={`fixed bottom-3 left-3 right-3 z-[1000] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] shadow-[4px_4px_var(--box-shadow-color)] rounded-xl p-1.5 max-w-[380px] mx-auto -webkit-tap-highlight-color-transparent touch-auto will-change-transform block md:hidden ${isTransitioning ? 'animate-smoothTransition' : ''}`}
      >
        <div className="flex justify-between items-center w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`bg-transparent border-none text-[var(--text-color)] cursor-pointer py-2 px-0 m-0 flex flex-col items-center justify-center flex-1 transition-all duration-300 touch-manipulation select-none relative
                ${activeSection === item.id ? 'opacity-100' : 'opacity-70'} 
                before:content-[''] before:absolute before:-top-[10px] before:-left-[5px] before:-right-[5px] before:-bottom-[10px] before:z-[-1]`}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
            >
              <div className={`w-7 h-7 flex items-center justify-center rounded-md transition-all duration-300
                ${activeSection === item.id ? 'bg-[var(--background-color)] border border-[var(--text-color)] shadow-[2px_2px_var(--box-shadow-color)] -translate-y-[3px]' : ''}`}>
                {item.icon}
              </div>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navigation; 