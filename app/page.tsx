import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Work from './components/Work';
import Yapping from './components/Yapping';

import Footer from './components/Footer';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="nb-grid bg-nb-bg text-nb-ink min-h-screen">
      <Navigation />
      <Hero />
      <Education />
      <Skills />
      <Projects />
      <Work />
      <Yapping />
      <Footer />
    </main>
  );
}