import { getYouTubeId } from "@/components/video-clip-embed";
import { getReleases, ReleaseVideoClip, Release } from "@/data";
import { Suspense } from "react";
import { connection } from "next/server";

async function getRandomVideoClip(): Promise<ReleaseVideoClip | null> {
  const releases = await getReleases();
  const clips = releases.flatMap((release) => release.videoClips ?? []);
  if (clips.length === 0) return null;
  const clip = clips[Math.floor(Math.random() * clips.length)];
  return clip;
}

export async function RandomVideoClipDefer() {
  // Explicitly defer to request time
  await connection();

  const clip = await getRandomVideoClip();
  if (!clip) return null;
  const ytId = getYouTubeId(clip.url);

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
