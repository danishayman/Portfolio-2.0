import Hero from './component/Hero';
import Education from './component/Education';
import Skills from './component/Skills';
import Projects from './component/Projects';

export default function Home() {
  return (
    <main>
      <Hero />
      <Education />
      <Skills />
      <Projects />
      {/* Add other components here */}
    </main>
  );
}