import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const bg = "hsl(40, 20%, 96%)";
const fg = "hsl(0, 0%, 8%)";
const muted = "hsl(0, 0%, 45%)";

export async function fetchImageAsDataUri(
  url: string,
): Promise<string | null> {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const ct = res.headers.get("content-type") || "image/jpeg";
    return `data:${ct};base64,${base64}`;
  } catch {
    return null;
  }
}

export function notFoundOg() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: bg,
          width: "100%",
          height: "100%",
        }}
      >
        Not found
      </div>
    ),
    { ...ogSize },
  );
}

export function ogImage({
  imageDataUri,
  title,
  subtitle,
  detail,
  titleSize = 64,
}: {
  imageDataUri: string | null;
  title: string;
  subtitle?: string;
  detail?: string;
  titleSize?: number;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          background: bg,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: 80,
          fontFamily: "serif",
        }}
      >
        {imageDataUri ? (
          <img
            src={imageDataUri}
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div style={{ display: "flex", width: 0 }} />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: imageDataUri ? 60 : 0,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: muted }}>
            Studio Bato
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              color: fg,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "hsl(0, 0%, 30%)",
                marginTop: 16,
              }}
            >
              {subtitle}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
          {detail ? (
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: muted,
                marginTop: 12,
                lineHeight: 1.4,
              }}
            >
              {detail}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
