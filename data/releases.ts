import { ReleasesSchema } from "./schemas";
import type { Release } from "./types";
import releasesData from "./releases.json";

export const releases: Array<Release> = ReleasesSchema.parse(releasesData).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const featuredReleasesIds = [
  "radiobato-chappal-pehenke-chalo",
  "dzuko-walass-clavier-a-la-mer",
];

export const featuredReleases = releases.filter((r) =>
  featuredReleasesIds.includes(r.id),
);
