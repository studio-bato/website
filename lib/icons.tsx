import {
  SiSpotify,
  SiInstagram,
  SiSoundcloud,
  SiYoutube,
  SiFacebook,
  SiBandcamp,
  SiMastodon,
  SiDeezer,
  SiApplemusic,
} from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";
import type { ComponentType } from "react";

function SiQobuz({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="8"
        d="M140.672 157.486a76.004 76.004 0 0 1-102.464-12.128 76.001 76.001 0 0 1 107.15-107.15 76.004 76.004 0 0 1 12.128 102.464"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="15"
        strokeWidth="8"
        d="M124.807 142.105a54.364 54.364 0 1 1 17.296-17.296"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="15"
        strokeWidth="8"
        d="M95.997 117.193c11.705 0 21.193-9.488 21.193-21.193 0-11.704-9.488-21.193-21.193-21.193-11.704 0-21.193 9.489-21.193 21.193 0 11.705 9.489 21.193 21.193 21.193Z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="15"
        strokeWidth="3.799"
        d="M95.997 98.103a2.103 2.103 0 1 0 0-4.205 2.103 2.103 0 0 0 0 4.205Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="15"
        strokeWidth="12"
        d="m121.193 121.196 41.871 41.625"
      />
    </svg>
  );
}

interface IconEntry {
  icon: ComponentType<{ className?: string }>;
  label: string;
}

export const icons: Record<string, IconEntry> = {
  spotify: { icon: SiSpotify, label: "Spotify" },
  instagram: { icon: SiInstagram, label: "Instagram" },
  soundcloud: { icon: SiSoundcloud, label: "SoundCloud" },
  youtube: { icon: SiYoutube, label: "YouTube" },
  facebook: { icon: SiFacebook, label: "Facebook" },
  twitter: { icon: ExternalLink, label: "Twitter" },
  mastodon: { icon: SiMastodon, label: "Mastodon" },
  bandcamp: { icon: SiBandcamp, label: "Bandcamp" },
  deezer: { icon: SiDeezer, label: "Deezer" },
  qobuz: { icon: SiQobuz, label: "Qobuz" },
  appleMusic: { icon: SiApplemusic, label: "Apple Music" },
};
