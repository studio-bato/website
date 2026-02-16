import { z } from "zod";

export const SocialsSchema = z.object({
  spotify: z.string().optional(),
  instagram: z.string().optional(),
  soundcloud: z.string().optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  mastodon: z.string().optional(),
  bandcamp: z.string().optional(),
});

export const AudioPlatformLinksSchema = z.object({
  spotify: z.string().optional(),
  soundcloud: z.string().optional(),
  deezer: z.string().optional(),
  qobuz: z.string().optional(),
  appleMusic: z.string().optional(),
  youtube: z.string().optional(),
});

export const BuyLinksSchema = z.object({
  bandcamp: z.string().optional(),
  elasticStage: z.string().optional(),
});

export const TrackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().optional(),
  artistIds: z.array(z.string()).optional(),
});

export const ReleaseVideoClipSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required"),
});

export const ArtistSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional().describe("textarea"),
  image: z.string().optional(),
  socials: SocialsSchema.optional(),
  featuredReleases: z.array(z.string()).optional(),
});

export const ReleaseSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  artistIds: z.array(z.string()).optional(),
  cover: z.string().optional(),
  description: z.string().optional().describe("textarea"),
  date: z.string().min(1, "Date is required"),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  type: z.string().min(1, "Type is required"),
  plaftormLinks: AudioPlatformLinksSchema.optional(),
  buyLinks: BuyLinksSchema.optional(),
  tracks: z.array(TrackSchema).optional(),
  videoClips: z.array(ReleaseVideoClipSchema).optional(),
});

export const ReleasesSchema = z.array(ReleaseSchema);
export const ArtistsSchema = z.array(ArtistSchema);

export const FeaturesSchema = z.object({
  heroYTEmbed: z.array(z.string()),
});

export type Socials = z.infer<typeof SocialsSchema>;
export type AudioPlatformLinks = z.infer<typeof AudioPlatformLinksSchema>;
export type BuyLinks = z.infer<typeof BuyLinksSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type ReleaseVideoClip = z.infer<typeof ReleaseVideoClipSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Release = z.infer<typeof ReleaseSchema>;
export type Features = z.infer<typeof FeaturesSchema>;
