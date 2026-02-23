import { getYouTubeId } from "@/components/video-clip-embed";
import { getAllVideoClips } from "@/data";
import { Suspense } from "react";
import { connection } from "next/server";

export async function RandomVideoClipDefer() {
  // Explicitly defer to request time
  await connection();

  const all = getAllVideoClips();
  if (all.length === 0) return null;
  const clip = all[Math.floor(Math.random() * all.length)].clip;
  const ytId = clip ? getYouTubeId(clip.url) : null;

  if (!ytId) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-10">
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
  );
}

export default function RandomVideoClip() {
  return (
    <Suspense fallback={null}>
      <RandomVideoClipDefer />
    </Suspense>
  );
}
