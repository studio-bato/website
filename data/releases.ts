import type { Release } from "./types";

export const releases: Array<Release> = [
  {
    id: "radiobato-chappal-pehenke-chalo",
    title: "Chappal Pehenke Challo",
    artistIds: ["radiobato"],
    cover: "/assets/releases/radiobato/chappal-pehenke-chalo/cover.jpg",
    date: "2024-01-15",
    genres: ["Electronic"],
    description: "A trip through india",
    type: "EP",
    links: {
      spotify: "https://open.spotify.com/album/nocturnal-reflections",
      appleMusic: "https://music.apple.com/album/nocturnal-reflections",
      bandcamp: "https://label.bandcamp.com/album/nocturnal-reflections",
    },
    tracks: [
      {
        title: "Moola Mantra",
        url: "/assets/releases/radiobato/chappal-pehenke-chalo/1.MOOLA MANTRA-MP3.mp3",
      },
      {
        title: "Groove Has No Border",
        url: "/assets/releases/radiobato/chappal-pehenke-chalo/2. GROOVE HAS NO BORDER-MP3.mp3",
      },
      {
        title: "32 Janvier",
        url: "/assets/releases/radiobato/chappal-pehenke-chalo/3. 32 JANVIER-MP3.mp3",
      },
      {
        title: "Collect your cash",
        url: "/assets/releases/radiobato/chappal-pehenke-chalo/4. COLLECT YOUR CASH-MP3.mp3",
      },
      {
        title: "Morning with Hanuman",
        url: "/assets/releases/radiobato/chappal-pehenke-chalo/5.MORNING WITH HANUMAN MASTER-MP3.mp3",
      },
    ],
  },
  {
    id: "dzuko-walass-clavier-a-la-mer",
    title: "Clavier à la mer",
    artistIds: ["dzuko", "walass"],
    cover: "/assets/releases/dzuko-walass/clavier-a-la-mer/cover.jpg",
    description: "A vocal experience",
    date: "2024-03-15",
    genres: ["Ambient", "Electronic"],
    type: "EP",
    links: {
      spotify: "https://open.spotify.com/album/nocturnal-reflections",
      appleMusic: "https://music.apple.com/album/nocturnal-reflections",
      bandcamp: "https://label.bandcamp.com/album/nocturnal-reflections",
    },
    tracks: [
      {
        title: "Autour de moi",
        url: "/assets/releases/dzuko-walass/clavier-a-la-mer/WALASS ET DZUKO - Clavier à la mer - 01 - Autour de moi__16b-44k-.mp3",
      },
      {
        title: "Clavier à la mer",
        url: "/assets/releases/dzuko-walass/clavier-a-la-mer/WALASS ET DZUKO - Clavier à la mer - 02 - Clavier à la mer__16b-44k-.mp3",
      },
      {
        title: "Remède",
        url: "/assets/releases/dzuko-walass/clavier-a-la-mer/WALASS ET DZUKO - Clavier à la mer - 03 - Remède__16b-44k-.mp3",
      },
      {
        title: "Habeas Corpus",
        url: "/assets/releases/dzuko-walass/clavier-a-la-mer/WALASS ET DZUKO - Clavier à la mer - 04 - Habeas Corpus__16b-44k-.mp3",
      },
      {
        title: "La prose et l'épine",
        url: "/assets/releases/dzuko-walass/clavier-a-la-mer/WALASS ET DZUKO - Clavier à la mer - 05 - La prose et l'épine__16b-44k-.mp3",
      },
    ],
  },
];

const featuredReleasesIds = [
  "radiobato-chappal-pehenke-chalo",
  "dzuko-walass-clavier-a-la-mer",
];

export const featuredReleases = releases.filter((r) =>
  featuredReleasesIds.includes(r.id),
);