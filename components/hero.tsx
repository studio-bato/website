import { getRandomVideoClip } from "@/data/utils";
import { getYouTubeId } from "@/components/video-clip-embed";

export function Hero() {
  const clip = getRandomVideoClip();
  const ytId = clip ? getYouTubeId(clip.url) : null;

  return (
    <section className="relative min-h-[calc(100dvh-16rem)] overflow-hidden flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 lg:py-32">
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

      {ytId && (
        <div className="mx-auto w-full max-w-6xl px-6 pb-10">
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${ytId}`}
              title={clip!.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

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
