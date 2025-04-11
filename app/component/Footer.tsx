"use client";

import { useTheme } from "../common/ThemeContext";

const Footer = () => {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <section
            id="footer"
            className="py-6 text-center font-mono"
        >
            <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                &copy; {currentYear} danishayman.<br />
                All rights reserved.
            </p>
        </section>
    );
};

export default Footer; 