'use client';

import { useEffect } from 'react';

export default function CSSLoader() {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadCSS = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Preload critical resources
    const preloadResource = (href: string, as: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    };

    // Load critical fonts first
    preloadResource('https://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_ROW4AJi8SJQt.woff2', 'font');
    preloadResource('https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UE80V4bVkA.woff2', 'font');

    // Add font-display: swap to existing fonts
    const fontFaces = document.styleSheets;
    for (let i = 0; i < fontFaces.length; i++) {
      try {
        const rules = fontFaces[i].cssRules || fontFaces[i].rules;
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].type === CSSRule.FONT_FACE_RULE) {
            const fontFaceRule = rules[j] as CSSFontFaceRule;
            const style = fontFaceRule.style as any;
            if (!style.fontDisplay) {
              style.fontDisplay = 'swap';
            }
          }
        }
      } catch (e) {
        // Ignore cross-origin stylesheet errors
      }
    }
  }, []);

  return null;
}
