import Hero from './component/Hero';
import Education from './component/Education';
import Skills from './component/Skills';
import Projects from './component/Projects';
import Work from './component/Work';
import Contact from './component/Contact';
import Footer from './component/Footer';
import Navigation from './component/Navigation';

export default function Home() {
  return (
    <main className="pb-20 md:pb-0">
      <Navigation />
      <Hero />
      <Education />
      <Skills />
      <Projects />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}