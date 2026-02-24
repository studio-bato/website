import { getArtistById, getMediaUrl } from "@/data";
import {
  ogSize,
  ogContentType,
  fetchImageAsDataUri,
  notFoundOg,
  ogImage,
} from "@/lib/og";

export const alt = "Artist";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = await getArtistById(id);
  if (!artist) return notFoundOg();

  const bio =
    artist.bio && artist.bio.length > 150
      ? artist.bio.slice(0, 150) + "..."
      : artist.bio;

  const imageDataUri = artist.image
    ? await fetchImageAsDataUri(getMediaUrl(artist.image)!)
    : null;

  return ogImage({
    imageDataUri,
    title: artist.name,
    detail: bio || undefined,
  });
}
