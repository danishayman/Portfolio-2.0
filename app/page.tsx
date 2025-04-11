import Hero from './component/Hero';
import Education from './component/Education';
import Skills from './component/Skills';
import Projects from './component/Projects';
import Work from './component/Work';
import Contact from './component/Contact';
import Footer from './component/Footer';

export default function Home() {
  return (
    <main>
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