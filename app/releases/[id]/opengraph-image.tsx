import { getMediaUrl } from "@/data/media";
import { getReleaseByIdMapped } from "@/data";
import {
  ogSize,
  ogContentType,
  fetchImageAsDataUri,
  notFoundOg,
  ogImage,
} from "@/lib/og";
import { getTranslations } from "next-intl/server";

export const alt = "Release";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const releaseMapped = await getReleaseByIdMapped(id);
  if (!releaseMapped) return notFoundOg();
  const t = await getTranslations("releaseDetail");

  const coverDataUri = releaseMapped.cover
    ? await fetchImageAsDataUri(getMediaUrl(releaseMapped.cover)!)
    : null;

  return ogImage({
    imageDataUri: coverDataUri,
    title: releaseMapped.title,
    titleSize: 56,
    subtitle:
      releaseMapped.artists?.map((a) => a.name).join(", ") ||
      t("variousArtists"),
    detail: `${releaseMapped.type} · ${releaseMapped.genres?.map((g) => g.label).join(", ")}`,
  });
}
