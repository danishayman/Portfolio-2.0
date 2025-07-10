'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';

interface SectionVisibilityWrapperProps {
  children: ReactNode;
}

export default function SectionVisibilityWrapper({ children }: SectionVisibilityWrapperProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkVisibility = useCallback(() => {
    if (typeof window === 'undefined' || !mounted) return;

    // Mobile: Always show
    // Desktop: Only show when a section is specifically navigated to
    const isSmallScreen = window.innerWidth < 768;
    setIsMobile(isSmallScreen);

    if (isSmallScreen) {
      setShouldShow(true);
    } else {
      // In desktop view, check if we're at a specific section based on URL hash or scrolled down
      // Use a smaller threshold to make sure the user can start scrolling sooner
      setShouldShow(window.location.hash !== '' || window.scrollY > (window.innerHeight * 0.5));
    }
  }, [mounted]);

  // Handle hash change
  const handleHashChange = useCallback(() => {
    setShouldShow(true);
  }, []);

  // Force show sections when navigation link is clicked
  const handleShowSections = useCallback(() => {
    setShouldShow(true);
  }, []);

  useEffect(() => {
    // Set mounted to true
    setMounted(true);

    // Wait for component to be mounted before checking visibility
    if (typeof window === 'undefined') return;

    // Initial check - immediate check for hash on load
    if (window.location.hash) {
      setShouldShow(true);
    } else {
      checkVisibility();
    }

    // Set up event listeners
    const addEventListeners = () => {
      window.addEventListener('resize', checkVisibility);
      window.addEventListener('scroll', checkVisibility);
      window.addEventListener('hashchange', handleHashChange);
      window.addEventListener('wheel', checkVisibility);
      window.addEventListener('touchmove', checkVisibility);
      window.addEventListener('showSections', handleShowSections);
    };

    // Add event listeners safely
    addEventListeners();

    // Clean up
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkVisibility);
        window.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('wheel', checkVisibility);
        window.removeEventListener('touchmove', checkVisibility);
        window.removeEventListener('showSections', handleShowSections);
      }
    };
  }, [checkVisibility, handleShowSections, handleHashChange]);

  // On server or before mounting, return all children visible
  if (!mounted) {
    return <div>{children}</div>;
  }

  // After mounting, use the computed visibility
  return (
    <div
      style={{
        opacity: shouldShow ? 1 : 0,
        transition: 'opacity 500ms',
        visibility: shouldShow || isMobile ? 'visible' : 'hidden',
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
} 