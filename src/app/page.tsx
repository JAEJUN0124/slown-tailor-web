import { BANNERS } from "@/content/home";
import { Differentiation } from "@/components/home/Differentiation";
import { Directors } from "@/components/home/Directors";
import { FinalCta } from "@/components/home/FinalCta";
import { FullBleed } from "@/components/home/FullBleed";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { IntroLoader } from "@/components/home/IntroLoader";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { Teaser } from "@/components/home/Teaser";
import { Vision } from "@/components/home/Vision";

export default function HomePage() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <Teaser />
      <ProblemSolution />
      <FullBleed caption={BANNERS.first} tone={4} paint="coffee" threadSide="left" />
      <Reviews />
      <Gallery />
      <Differentiation />
      <Process />
      <FullBleed caption={BANNERS.second} tone={0} grayscale paint="espresso" threadSide="right" />
      <Directors />
      <PricingPreview />
      <HomeFaq />
      <Vision />
      <FinalCta />
    </>
  );
}
