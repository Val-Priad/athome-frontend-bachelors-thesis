import Image from "next/image";

export function HomeHeroBackground() {
  return (
    <div className="col-start-1 row-start-1 grid min-h-0 overflow-hidden">
      <Image
        src="/images/home-hero-dark.webp"
        alt=""
        width={2560}
        height={1440}
        preload
        sizes="100vw"
        className="col-start-1 row-start-1 size-full min-h-0 min-w-0 object-cover object-center"
      />
      <div className="col-start-1 row-start-1 bg-linear-to-b from-black/10 to-black/70" />
    </div>
  );
}
