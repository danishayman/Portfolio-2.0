'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Home, Briefcase, Laptop, GraduationCap, Code, Mail } from 'lucide-react';
import { useTheme } from '../common/ThemeContext';

function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const { isTransitioning } = useTheme();
  const scrollLock = useRef(false);
  const mobileNavRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { id: 'hero', label: 'HOME', mobileLabel: 'HOME', icon: <Home size={18} /> },
    { id: 'education', label: 'EDUCATION', mobileLabel: 'EDU', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'SKILLS', mobileLabel: 'SKILLS', icon: <Code size={18} /> },
    { id: 'projects', label: 'PROJECTS', mobileLabel: 'PROJ', icon: <Laptop size={18} /> },
    { id: 'work', label: 'EXPERIENCE', mobileLabel: 'WORK', icon: <Briefcase size={18} /> },
    { id: 'contact', label: 'CONTACT', mobileLabel: 'CONTACT', icon: <Mail size={18} /> },
  ];

  // Mark component as mounted on initial render
  useEffect(() => {
    setMounted(true);
    
    // Remove the no-js fallback nav when JS loads
    const fallbackNav = document.getElementById('fallback-nav');
    if (fallbackNav) {
      fallbackNav.style.display = 'none';
    }
  }, []);

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
        prev!.getBoundingClientRect().top < current!.getBoundingClientRect().top ? prev : current
      );
      setActiveSection(topSection!.id);
    }
  }, [navItems]);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (!scrollLock.current) {
      requestAnimationFrame(updateActiveSection);
    }
  }, [updateActiveSection]);

  // Improved scroll-to-section with momentum handling
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    scrollLock.current = true;
    setActiveSection(id);
    
    // If clicking on the HOME/hero item, scroll to the very top of the page
    if (id === 'hero') {
      window.scrollTo({
        top: 0,
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
      
      return;
    }
    
    // Find the section-header div or h1 element within the section
    const sectionHeader = element.querySelector('.section-header, h1');
    
    const isMobile = window.innerWidth <= 768;
    const navHeight = isMobile 
      ? (mobileNavRef.current ? (mobileNavRef.current as HTMLElement).offsetHeight + 20 : 20)
      : 80; // Desktop nav height + padding
    
    // For desktop, trigger a custom event to show sections when navigating to non-hero sections
    if (!isMobile && id !== 'hero') {
      // Create and dispatch a custom event to signal that sections should be shown
      const showSectionsEvent = new CustomEvent('showSections');
      window.dispatchEvent(showSectionsEvent);
    }
    
    // Get the top position of the section
    const sectionTop = element.getBoundingClientRect().top + window.scrollY;
    
    // If we found the header, scroll to position it with a consistent offset
    // Otherwise, fall back to the previous behavior with improved offset
    const scrollPosition = sectionHeader 
      ? sectionHeader.getBoundingClientRect().top + window.scrollY - navHeight
      : sectionTop - navHeight;
    
    window.scrollTo({
      top: scrollPosition,
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
    const resizeObserver = new ResizeObserver(() => {
      updateActiveSection();
    });
    resizeObserver.observe(document.documentElement);

    window.addEventListener('scroll', handleScroll, passiveOptions);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
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
                className={`bg-transparent border-none text-[var(--text-color)] text-sm md:text-base font-bold cursor-pointer py-2 px-4 rounded-md transition-all duration-300 relative font-mono
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

      {/* No-JS fallback mobile navigation - will be hidden once JS loads */}
      <nav 
        id="fallback-nav"
        className="fixed bottom-3 left-3 right-3 z-[9999] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] shadow-[4px_4px_var(--box-shadow-color)] rounded-xl p-2 max-w-[400px] mx-auto block md:hidden"
      >
        <div className="flex justify-between items-start w-full">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="bg-transparent border-none text-[var(--text-color)] py-1 px-0 m-0 flex flex-col items-center justify-center flex-1 relative"
              aria-label={item.label}
            >
              <div className="w-7 h-7 flex items-center justify-center rounded-md">
                {item.icon}
              </div>
            </a>
          ))}
        </div>
      </nav>

      {/* JS Mobile Navigation */}
      {mounted && (
        <nav 
          ref={mobileNavRef}
          className={`fixed bottom-3 left-3 right-3 z-[1000] bg-[var(--background-color)] border-[1.5px] border-[var(--border-color)] shadow-[4px_4px_var(--box-shadow-color)] rounded-xl p-2 max-w-[400px] mx-auto -webkit-tap-highlight-color-transparent touch-auto will-change-transform block md:hidden mobile-nav-animation ${isTransitioning ? 'animate-smoothTransition' : ''}`}
          style={{zIndex: 9999}} // Ensure highest z-index
        >
          <div className="flex justify-between items-start w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`bg-transparent border-none text-[var(--text-color)] cursor-pointer py-1 px-0 m-0 flex flex-col items-center justify-center flex-1 transition-all duration-300 touch-manipulation select-none relative
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
      )}
    </>
  );
}

export default Navigation; 