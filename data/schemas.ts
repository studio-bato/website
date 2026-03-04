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
});

export const GenreSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export const ReleaseSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  artistIds: z.array(z.string().describe("artist-id")).optional(),
  cover: z.string().optional(),
  description: z.string().optional().describe("textarea"),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  genreIds: z
    .array(z.string())
    .optional() /*.min(1, "At least one genre is required")*/,
  type: z.string().min(1, "Type is required"),
  plaftormLinks: AudioPlatformLinksSchema.optional(),
  buyLinks: BuyLinksSchema.optional(),
  tracks: z.array(TrackSchema).optional(),
  videoClips: z.array(ReleaseVideoClipSchema).optional(),
});

export const TrackMappedSchema = TrackSchema.extend({
  artists: z.array(ArtistSchema).optional(),
});

export const ReleaseMappedSchema = ReleaseSchema.extend({
  artists: z.array(ArtistSchema).optional(),
  genres: z.array(GenreSchema).optional(),
  tracks: z.array(TrackMappedSchema).optional(),
});

export const ArtistMappedSchema = ArtistSchema.extend({
  releases: z.array(ReleaseSchema).optional(),
});

export const ReleasesSchema = z.array(ReleaseSchema);
export const ArtistsSchema = z.array(ArtistSchema);
export const GenresSchema = z.array(GenreSchema);

export type Socials = z.infer<typeof SocialsSchema>;
export type AudioPlatformLinks = z.infer<typeof AudioPlatformLinksSchema>;
export type BuyLinks = z.infer<typeof BuyLinksSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type ReleaseVideoClip = z.infer<typeof ReleaseVideoClipSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type Release = z.infer<typeof ReleaseSchema>;
export type ArtistMapped = z.infer<typeof ArtistMappedSchema>;
export type ReleaseMapped = z.infer<typeof ReleaseMappedSchema>;
export type Artists = z.infer<typeof ArtistsSchema>;
export type Releases = z.infer<typeof ReleasesSchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type Genres = z.infer<typeof GenresSchema>;
