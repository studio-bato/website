import type { Artist } from "./types";

export const artists: Array<Artist> = [
  {
    id: "radiobato",
    name: "RadioBato",
    bio: "Robotic Poetry eats mushrooms at party",
    image: "/assets/radiobato/profile.jpg",
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
    image: "/assets/walass/profile.jpg",
    socials: {
      instagram: "https://instagram.com/walass",
    },
  },
  {
    id: "youyou",
    name: "Youyou",
    bio: "des Bisous",
    image: "/assets/youyou/profile.jpg",
    socials: {
      instagram: "https://instagram.com/youyou",
    },
  },
];
