import { HomeHeader } from "@/shared/ui/HomeHeader";

import { HomeHeroBackground } from "./HomeHeroBackground";
import { HomeHeroContent } from "./HomeHeroContent";

export default function HomePageContent() {
  return (
    <main className="relative flex min-h-svh items-end overflow-hidden bg-neutral-900 text-white">
      <HomeHeroBackground />
      <HomeHeader />
      <HomeHeroContent />
    </main>
  );
}
