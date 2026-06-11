import { Hero } from "@/components/home/hero";
import { Positioning } from "@/components/home/positioning";
import { FeaturedWork } from "@/components/home/featured-work";
import { Capabilities } from "@/components/home/capabilities";
import { Operation } from "@/components/home/operation";
import { Approach } from "@/components/home/approach";
import { WritingPreview } from "@/components/home/writing-preview";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <FeaturedWork />
      <Capabilities />
      <Operation />
      <Approach />
      <WritingPreview />
      <CTA />
    </>
  );
}
