import Hero from './component/Hero';
import Education from './component/Education';
import Skills from './component/Skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <Education />
      <Skills />
      {/* Add other components here */}
    </main>
  );
}