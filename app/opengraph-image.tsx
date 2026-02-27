import { ImageResponse } from "next/og";

export const alt = "StudioBato | We ship songs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "hsl(40, 20%, 96%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "hsl(0, 0%, 8%)",
          letterSpacing: "-0.02em",
        }}
      >
        StudioBato
      </div>
      <div
        style={{
          fontSize: 28,
          color: "hsl(0, 0%, 45%)",
          marginTop: 16,
        }}
      >
        We ship songs
      </div>
    </div>,
    { ...size },
  );
}
