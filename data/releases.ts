import type { Release } from "./types";

export const releases: Array<Release> = [
  {
    id: "kmn-tard-sur-la-rive",
    title: "Tard sur la rive",
    artistIds: ["kmn"],
    cover: "/assets/releases/kmn/tslr.jpg",
    date: "2025-12-25",
    genres: ["Hip Hop"],
    type: "Single",
    links: {
      spotify: "https://open.spotify.com/track/79yapO0Gvr767LzNVDXrUh",
      appleMusic:
        "https://music.apple.com/fr/album/tard-sur-la-rive-feat-la-pierrre-b%C3%A9r%C3%A9sina-i20cestcarre/1863456762?at=1001l384B&ct=music_redirect&itsct=music_box_link&itscg=30200&ls=1",
      deezer:
        "https://www.deezer.com/us/track/3733699302?host=0&utm_campaign=clipboard-generic&utm_source=user_sharing&utm_content=track-3733699302&deferredFl=1&universal_link=1",
      soundcloud: "https://soundcloud.com/studiobato/kmn-tard-sur-la-rive",
    },
    tracks: [
      {
        title: "Tard sur la rive",
      },
    ],
    videoClips: [
      {
        title: "Tard sur la rive",
        url: "https://www.youtube.com/watch?v=pUBC_AoIMEQ",
      },
    ],
  },
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
      spotify: "https://open.spotify.com/artist/5R712bVV3bkwrzKocBIOao",
      deezer: "https://www.deezer.com/fr/artist/164362757",
      appleMusic: "https://www.deezer.com/fr/artist/164362757",
      soundcloud: "https://soundcloud.com/radiobato",
      youtube:
        "https://www.youtube.com/playlist?list=PLyWGL_AAdR8qj6P-lmKCphbB-cWh5Rs9N",
      bandcamp: "https://radiobato.bandcamp.com/album/chappal-pehenke-chalo-ep",
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
    videoClips: [
      {
        title: "Chappal Pehenke Chalo - Documentary",
        url: "https://www.youtube.com/watch?v=0bIbp8ip6NE",
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
    videoClips: [
      {
        title: "Habeas Corpus",
        url: "https://www.youtube.com/watch?&v=81I4FjL536c",
      },
    ],
  },
  {
    id: "la-cour-des-miracles",
    title: "La Cour des Miracles",
    date: "2024-05-20",
    genres: ["Hip-hop"],
    type: "Freestyles",
    cover: "/assets/releases/LCDM/profile.jpg",
    description: "Freestyle rap experimentaux, unique à chaque étape",
    tracks: [
      {
        title: "La Cour des Miracles - #1",
        artistIds: ["idial", "alphao", "walass", "kmn"],
      },
      {
        title: "La Cour des Miracles - #2",
        artistIds: ["youyou", "i20", "idial", "alphao", "walass", "kmn"],
      },
    ],
    videoClips: [
      {
        title: "La Cour des Miracles - #2",
        url: "https://www.youtube.com/watch?v=2UbtaPJYooY",
      },
      {
        title: "La Cour des Miracles - #1",
        url: "https://www.youtube.com/watch?v=P684tZIi5s0",
      },
    ],
  },
  {
    id: "bato-sessions",
    title: "Bato Sessions",
    date: "2024-05-20",
    genres: ["Hip-hop"],
    type: "Freestyles",
    cover: "/assets/releases/batosessions/profile.jpg",
    description: "Freestyle rap experimentaux, unique à chaque étape",
    videoClips: [
      {
        title: "Banalité - Skrab X Walass / Bato Sessions #3",
        url: "https://www.youtube.com/watch?v=WrD1p7o_8NQ",
      },
      {
        title: "AILE META - Gezel X Al'Phao / Bato Sessions #2",
        url: "https://www.youtube.com/watch?v=7ObleKGO7_A",
      },
      {
        title: "TJSILAROUT - Gezel / Bato Sessions #1",
        url: "https://www.youtube.com/watch?v=YzA5wr0vuCA",
      },
    ],
    tracks: [
      {
        title: "TJSILAROUT - Gezel / Bato Sessions #1",
        artistIds: ["gezel"],
      },
      {
        title: "AILE META - Gezel X Al'Phao / Bato Sessions #2",
        artistIds: ["gezel", "alphao"],
      },
      {
        title: "Banalité - Skrab X Walass / Bato Sessions #3",
        artistIds: ["skrab", "walass"],
      },
    ],
  },
  {
    id: "sern-pheromoney",
    title: "Pheromoney ",
    artistIds: ["SERN.", "La Virago", "West Galsen", "Lucioylle"],
    date: "2024-05-20",
    genres: ["Club Banger"],
    type: "Single",
    cover: "/assets/releases/sern/pheromoney/cover.jpg",
    links: {
      youtube: "https://www.youtube.com/watch?v=3IikfMTMX_Q",
      soundcloud:
        "https://soundcloud.com/studiobato/sern-la-virage-west-galsen-lucioylle-pheromoney/s-fKREFg3JjE3?si=f38bc90587eb4397bc65d766e0abd98b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      deezer:
        "https://www.deezer.com/us/album/871362512?host=18202941&utm_campaign=clipboard-generic&utm_source=user_sharing&utm_content=album-871362512&deferredFl=1",
      appleMusic:
        "https://music.apple.com/us/album/pheromoney-feat-la-virago-west-galsen-lucioylle-single/1858995689?at=1001l384B&ct=music_redirect&itsct=music_box_link&itscg=30200&ls=1&uo=4",
      spotify: "https://open.spotify.com/album/1uCxNb7B0EtC8i20OCjrcp",
    },
    tracks: [
      {
        title: "Pheromoney",
        artistIds: ["SERN.", "La Virago", "West Galsen", "Lucioylle"],
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