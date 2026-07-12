import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { BrandShowcase } from './components/MediaShowcase';
import { StorySection } from './components/StorySection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { ExperienceFlow } from './components/ExperienceFlow';
import { HopiinCircle } from './components/HopiinCircle';
import { WaitlistCTA } from './components/WaitlistCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <BrandShowcase />
        <StorySection />
        <FeatureShowcase />
        <ExperienceFlow />
        <HopiinCircle />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
