const MEDIA_CDN_URL =
  process.env.MEDIA_CDN_URL || "https://media.studiobato.org";

export function getMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  let cdn_url = MEDIA_CDN_URL;
  if (cdn_url[cdn_url.length - 1] === "/") cdn_url = cdn_url.slice(0, -1);
  if (url[url.length - 1] === "/") url = url.slice(0, -1);
  return `${cdn_url}/${url}`;
}
