import { releases, getReleaseArtists } from "@/data";
import {
  ogSize,
  ogContentType,
  fetchImageAsDataUri,
  notFoundOg,
  ogImage,
} from "@/lib/og";

export const alt = "Release";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const release = releases.find((a) => a.id === id);
  if (!release) return notFoundOg();

  const artistNames = getReleaseArtists(release)
    .map((a) => a.name)
    .join(", ");

  const coverDataUri = release.cover
    ? await fetchImageAsDataUri(release.cover)
    : null;

  return ogImage({
    imageDataUri: coverDataUri,
    title: release.title,
    titleSize: 56,
    subtitle: artistNames,
    detail: `${release.type} · ${release.genres.join(", ")}`,
  });
}
