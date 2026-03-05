#!/usr/bin/env node

// Grainy gradient SVG/PNG generator
// Inspired by https://www.fffuel.co/gggrain/
// Usage: node grain-style.js a b c
// Requires: npm install sharp (for PNG output)
// For SVG output only, no dependencies needed.

const fs = require("fs");
const path = require("path");

// ─── Color table ─────────────────────────────────────────────────────────────
// Map each key to a CSS color.
const COLOR_TABLE = {
  a: "hsl(0,   100%, 60%)", // red
  b: "hsl(20,  100%, 55%)", // orange
  c: "hsl(50,  100%, 55%)", // yellow
  d: "hsl(120, 60%,  45%)", // green
  e: "hsl(180, 70%,  45%)", // teal
  f: "hsl(210, 100%, 55%)", // blue
  g: "hsl(260, 80%,  60%)", // indigo
  h: "hsl(290, 80%,  55%)", // purple
  i: "hsl(330, 100%, 60%)", // pink
};

// ─── Generator parameters ────────────────────────────────────────────────────
// Tweak these manually to change the look.
const PARAMS = {
  width: 300,
  height: 300,

  // Gradient
  linear: true, // true = linear gradients, false = radial gradient
  angle: 130, // rotation angle for linear gradients
  radius: 0.5, // radial gradient radius (only used when linear=false)

  // Grain / noise filter
  frequency: 0.7, // feTurbulence baseFrequency — higher = finer grain
  seed: 2, // feTurbulence seed — change for a different pattern
  granularity: 8, // 1 (coarse) → 10 (fine/subtle)

  // Grain overlay
  mode: "soft-light", // CSS mix-blend-mode on the grain layer
  grainOpacity: 0.7, // 0–1

  // Post-processing
  saturate: false, // apply an extra feColorMatrix saturation pass
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function map(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

function buildSVG(color1, color2, color3) {
  const {
    width,
    height,
    linear,
    angle,
    radius,
    frequency,
    seed,
    granularity,
    mode,
    grainOpacity,
    saturate,
  } = PARAMS;

  const g1 = Math.round(map(granularity, 10, 1, 15, 25));
  const g2 = Math.round(map(granularity, 10, 1, -7, -17));

  const defs = [];
  const layers = [];

  // ── Gradients ──
  if (linear) {
    defs.push(`
    <linearGradient gradientTransform="rotate(-${angle}, 0.5, 0.5)"
        x1="50%" y1="0%" x2="50%" y2="100%" id="grad2">
      <stop stop-color="${color3}" stop-opacity="1" offset="0%"/>
      <stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"/>
    </linearGradient>`);

    defs.push(`
    <linearGradient gradientTransform="rotate(${angle}, 0.5, 0.5)"
        x1="50%" y1="0%" x2="50%" y2="100%" id="grad3">
      <stop stop-color="${color2}" stop-opacity="1" offset="0%"/>
      <stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"/>
    </linearGradient>`);
  } else {
    defs.push(`
    <radialGradient id="grad-radial" r="${radius}">
      <stop offset="0%"   stop-color="${color1}"/>
      <stop offset="50%"  stop-color="${color2}"/>
      <stop offset="100%" stop-color="${color3}"/>
    </radialGradient>`);
  }

  // ── Grain filter ──
  defs.push(`
  <filter id="grain-filter" x="-20%" y="-20%" width="140%" height="140%"
      filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${frequency}"
        numOctaves="2" seed="${seed}" stitchTiles="stitch"
        x="0%" y="0%" width="100%" height="100%" result="turbulence"/>
    <feColorMatrix type="saturate" values="0"
        x="0%" y="0%" width="100%" height="100%"
        in="turbulence" result="colormatrix"/>
    <feComponentTransfer x="0%" y="0%" width="100%" height="100%"
        in="colormatrix" result="componentTransfer">
      <feFuncR type="linear" slope="3"/>
      <feFuncG type="linear" slope="3"/>
      <feFuncB type="linear" slope="3"/>
    </feComponentTransfer>
    <feColorMatrix x="0%" y="0%" width="100%" height="100%"
        in="componentTransfer" result="colormatrix2" type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 ${g1} ${g2}"/>
  </filter>`);

  // ── Optional saturation filter ──
  if (saturate) {
    defs.push(`
  <filter id="saturate-filter" x="-20%" y="-20%" width="140%" height="140%"
      filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="3"
        x="0%" y="0%" width="100%" height="100%"
        in="SourceGraphic" result="colormatrix"/>
  </filter>`);
  }

  // ── Layer rectangles ──
  const wrapperAttrs = saturate ? ` filter="url(#saturate-filter)"` : "";

  if (linear) {
    layers.push(`<rect width="100%" height="100%" fill="${color1}"/>`);
    layers.push(`<rect width="100%" height="100%" fill="url(#grad3)"/>`);
    layers.push(`<rect width="100%" height="100%" fill="url(#grad2)"/>`);
  } else {
    layers.push(`<rect width="100%" height="100%" fill="url(#grad-radial)"/>`);
  }

  layers.push(`<rect width="100%" height="100%" fill="transparent"
      filter="url(#grain-filter)"
      opacity="${grainOpacity}"
      style="mix-blend-mode: ${mode}"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>${defs.join("")}
  </defs>
  <g${wrapperAttrs}>
    ${layers.join("\n    ")}
  </g>
</svg>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error("Usage: node gggrain.js <key1> <key2> <key3>");
  console.error("  Keys must be integers 1–9, e.g.: node gggrain.js 3 5 9");
  process.exit(1);
}

const keys = args;
for (const k of keys) {
  if (!COLOR_TABLE[k]) {
    console.error(`Key ${k} not found in COLOR_TABLE. Valid keys: 1–9.`);
    process.exit(1);
  }
}

const [color1, color2, color3] = keys.map((k) => COLOR_TABLE[k]);
console.log(`Colors: ${color1}  |  ${color2}  |  ${color3}`);
const fileName = `gggrain-${keys.join("-")}`;

const svgOutput = buildSVG(color1, color2, color3);
const svgFile = path.join(__dirname, "grains-style", `${fileName}.svg`);
fs.writeFileSync(svgFile, svgOutput, "utf8");
console.log(`SVG saved → ${svgFile}`);

// ── Optional PNG via sharp ──
try {
  const sharp = require("sharp");
  const pngFile = path.join(__dirname, "grains-style", `${fileName}.png`);
  sharp(Buffer.from(svgOutput))
    .png()
    .toFile(pngFile)
    .then(() => console.log(`PNG saved → ${pngFile}`))
    .catch((err) => console.error("sharp PNG error:", err.message));

  fs.rmSync(svgFile);
} catch (e) {
  console.error(e);
  console.log("sharp not installed — SVG only. Run: npm install sharp");
}
