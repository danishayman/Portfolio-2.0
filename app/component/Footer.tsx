const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <section
            id="footer"
            className="py-6 text-center font-mono"
        >
            <p className="text-sm md:text-xm footer-text">
                &copy; {currentYear} danishayman.<br />
                All rights reserved.
            </p>
        </section>
    );
};

export default Footer; 