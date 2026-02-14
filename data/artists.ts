import type { Artist } from "./types";

export const artists: Array<Artist> = [
  {
    id: "radiobato",
    name: "RadioBato",
    bio: "Robotic Poetry eats mushrooms at party",
    image: "/assets/artists/radiobato/profile.jpg",
    socials: {
      instagram: "https://instagram.com/radiobato",
      soundcloud: "https://soundcloud.com/radiobato",
    },
    // featuredReleases: ["release-1", "release-3"],
  },
  {
    id: "walass",
    name: "Walass",
    bio: "Quand c'est pas l'angoissse",
    image: "/assets/artists/walass/profile.jpg",
    socials: {
      instagram: "https://instagram.com/walass",
    },
  },
  {
    id: "youyou",
    name: "Youyou",
    bio: "des Bisous",
    image: "/assets/artists/youyou/profile.jpg",
    socials: {
      instagram: "https://instagram.com/youyou",
    },
  },
  {
    id: "dzuko",
    name: "Dzuko",
    bio: "Lyriciste",
    image: "/assets/artists/dzuko/profile.jpg",
    socials: {
      instagram: "https://instagram.com/youyou",
    },
  },
  {
    id: "kmn",
    name: "KMN",
    bio: "Old-school survivor",
    image: "/assets/artists/kmn/profile.jpg",
    socials: {
      instagram: "https://instagram.com/kmnmgp",
    },
  },
];

const featuredArtistsIds = ["radiobato", "walass"];

export const featuredArtists = artists.filter((a) =>
  featuredArtistsIds.includes(a.id),
);