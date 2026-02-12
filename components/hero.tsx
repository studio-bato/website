import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[calc(100dvh-16rem)]  flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          Independent Music Label
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[8rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          We ship
          <br />
          songs
        </h1>
        <p className="mt-8 text-muted-foreground text-center max-w-md leading-relaxed">
          House made and lovely brought to you from our boat studio.
        </p>
      </div>

      <div className="mx-auto flex justify-center w-full max-w-6xl h-2/5 pb-10">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/pUBC_AoIMEQ?si=yl3UBPle6y--hju8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      {/*<div className="mx-auto max-w-6xl w-full px-6 pb-6">
       
        <div className="grid grid-cols-3 gap-3 h-72 sm:h-96">
           <div className="relative overflow-hidden col-span-2">
            <Image
              src="/images/hero.jpg"
              alt="Live concert with dramatic stage lighting"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/artist-1.jpg"
              alt="Featured artist portrait"
              fill
              className="object-cover"
              priority
            />
          </div> 
        </div>
      </div>*/}
    </section>
  );
}
