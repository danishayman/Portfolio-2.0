'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Home, Briefcase, Laptop, GraduationCap, Code, MessageSquareMore } from 'lucide-react';
import { NAV_BG, NAV_HOVER_BG } from '../common/palette';
import ThemeToggle from '../common/ThemeToggle';

const navItems = [
  { id: 'hero', label: 'HOME', icon: Home },
  { id: 'education', label: 'EDU', icon: GraduationCap },
  { id: 'skills', label: 'SKILLS', icon: Code },
  { id: 'projects', label: 'PROJECTS', icon: Laptop },
  { id: 'work', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'yapping', label: 'YAPPING', icon: MessageSquareMore },
];

function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  // Active section = the last one whose top has passed 40% of the viewport
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 'hero';
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Re-measure when layout settles (fonts, images, viewport changes)
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Sections below the hero stay hidden on desktop until navigated to
  const showSections = () => window.dispatchEvent(new CustomEvent('showSections'));

  return (
    <>
      {/* Desktop: sticky top bar */}
      <nav className="hidden md:block sticky top-0 z-1000 bg-nb-bg border-b-[3px] border-nb-ink select-none">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-6 justify-between">
          <a href="#hero" className="flex items-center gap-2.5 shrink-0" onClick={showSections}>
            <span className="w-8 h-8 bg-black border-[3px] border-nb-ink overflow-hidden shadow-hard-3">
              <Image
                src="/my-favicon/web-app-manifest-192x192.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full scale-[1.6]"
              />
            </span>
            <span className="font-pixel text-xs text-nb-ink">danishayman.exe</span>
          </a>

          <div className="flex items-center gap-1.5 min-w-0">
            <div className="flex gap-1.5 overflow-x-auto p-1">
              {navItems.map((item, i) => {
                const active = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={showSections}
                    aria-current={active ? 'true' : undefined}
                    className={`font-pixel text-[10px] px-3 py-2.5 whitespace-nowrap border-[3px] ${NAV_HOVER_BG[i % NAV_HOVER_BG.length]} hover:text-nb-on hover:border-nb-ink hover:shadow-hard-3 hover:-translate-x-px hover:-translate-y-px ${
                      active
                        ? `${NAV_BG[i % NAV_BG.length]} text-nb-on border-nb-ink shadow-hard-3`
                        : 'bg-transparent text-nb-ink border-transparent'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile: floating icon bar at the bottom, as in the previous layout */}
      <nav
        aria-label="Sections"
        className="md:hidden fixed bottom-3 left-3 right-3 z-1000 max-w-[400px] mx-auto bg-nb-card border-[3px] border-nb-ink shadow-hard-4 p-2 select-none"
      >
        <div className="flex justify-between items-center">
          {navItems.map((item, i) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={active ? 'true' : undefined}
                className="flex-1 flex justify-center py-1 [-webkit-tap-highlight-color:transparent]"
              >
                <span
                  className={`w-9 h-9 grid place-items-center border-2 transition-[translate,rotate,scale,box-shadow] duration-100 ${
                    active
                      ? `${NAV_BG[i % NAV_BG.length]} text-nb-on border-nb-ink shadow-hard-3 translate-y-[-3px]`
                      : 'border-transparent text-nb-ink'
                  }`}
                >
                  <Icon size={18} />
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
