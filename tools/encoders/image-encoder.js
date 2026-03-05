#!/usr/bin/env node

/**
 * Image converter: jpg → WebP
 * Usage:
 *   node image-encoder.js input.jpg
 *   node image-encoder.js input.jpg output.jpg
 */

const path = require("path");
const sharp = require("sharp");

async function convertToWebP(inputPath, outputPath, quality = 92) {
  await sharp(inputPath)
    .resize(800, 800, {
      fit: "outside", // smallest side = 800px, keeps ratio
      withoutEnlargement: true, // skip if already smaller
    })
    .webp({ quality })
    .toFile(outputPath);

  console.log(`✅ Done: ${outputPath}`);
}

const input = process.argv[2];
const output =
  process.argv[3] ??
  path.join(
    path.dirname(input),
    path.basename(input, path.extname(input)) + ".webp",
  );

convertToWebP(input, output).catch((err) => console.error("❌", err.message));
