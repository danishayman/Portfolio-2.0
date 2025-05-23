import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Hero from './component/Hero';
import Education from './component/Education';
import Skills from './component/Skills';
import Projects from './component/Projects';
import Work from './component/Work';
import Yapping from './component/Yapping';
import Contact from './component/Contact';
import Footer from './component/Footer';
import Navigation from './component/Navigation';
import SectionVisibilityWrapper from './component/SectionVisibilityWrapper';

export default function Home() {
  return (
    <main className="pb-20 md:pb-0">
      <Navigation />
      <Hero />
      <SpeedInsights />
      <Analytics />
      <SectionVisibilityWrapper>
        <Education />
        <Skills />
        <Projects />
        <Work />
        <Yapping />
        <Footer />
      </SectionVisibilityWrapper>
    </main>
  );
}