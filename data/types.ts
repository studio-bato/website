export interface Socials {
  spotify?: string;
  instagram?: string;
  soundcloud?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
  mastodon?: string;
  bandcamp?: string;
}

export interface AudioPlatformLinks {
  spotify?: string;
  soundcloud?: string;
  deezer?: string;
  qobuz?: string;
  appleMusic?: string;
  bandcamp?: string;
  youtube?: string;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  image?: string;
  socials?: Socials;
  featuredReleases?: Array<string>;
}

export interface Track {
  title: string;
  url?: string;
  artistIds?: Array<string>;
}

export interface ReleaseVideoClip {
  title: string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  artistIds?: Array<string>;
  cover?: string;
  description?: string;
  date: string;
  genres: Array<string>;
  type: string;
  links?: AudioPlatformLinks;
  tracks?: Array<Track>;
  videoClips?: Array<ReleaseVideoClip>;
}

export interface Features {
  heroYTEmbed: Array<string>;
}