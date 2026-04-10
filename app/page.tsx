import { Hero } from "@/components/home/hero";
import { Positioning } from "@/components/home/positioning";
import { Capabilities } from "@/components/home/capabilities";
import { FeaturedWork } from "@/components/home/featured-work";
import { Approach } from "@/components/home/approach";
import { WritingPreview } from "@/components/home/writing-preview";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <FeaturedWork />
      <Approach />
      <WritingPreview />
      <CTA />
    </>
  );
}
