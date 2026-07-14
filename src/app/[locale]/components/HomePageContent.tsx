import { HomeHeader } from "@/shared/ui/HomeHeader";

import { HomeHeroBackground } from "./HomeHeroBackground";
import { HomeHeroContent } from "./HomeHeroContent";

export default function HomePageContent() {
  return (
    <main className="grid h-svh grid-cols-1 grid-rows-[minmax(0,1fr)] overflow-hidden bg-neutral-900 text-white">
      <HomeHeroBackground />
      <div className="col-start-1 row-start-1 flex min-h-0 flex-col">
        <HomeHeader />
        <HomeHeroContent />
      </div>
    </main>
  );
}
