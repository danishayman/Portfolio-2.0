import Hero from './component/Hero';
import Education from './component/Education';
import Skills from './component/Skills';
import Projects from './component/Projects';
import Work from './component/Work';
import Yapping from './component/Yapping';

import Footer from './component/Footer';
import Navigation from './component/Navigation';

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