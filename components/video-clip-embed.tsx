import type { ReleaseVideoClip } from "@/data/types";

export function VideoClipEmbed({ clip }: { clip: ReleaseVideoClip }) {
  const youtubeVideoId = getYouTubeId(clip.url);
  if (youtubeVideoId) {
    return (
      <div>
        <div className="relative w-full aspect-video overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title={clip.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm font-medium text-foreground mt-3">{clip.title}</p>
      </div>
    );
  }
  return (
    <a
      href={clip.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-foreground hover:text-foreground/80 transition-colors"
    >
      {clip.title}
    </a>
  );
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
