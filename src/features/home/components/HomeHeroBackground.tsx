import Image from "next/image";

interface HomeHeroBackgroundProps {
  alt: string;
}

export function HomeHeroBackground({ alt }: HomeHeroBackgroundProps) {
  return (
    <>
      <Image
        src="/images/home-hero-dark.webp"
        alt={alt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/70" />
    </>
  );
}
