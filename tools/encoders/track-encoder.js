#!/usr/bin/env node

/**
 * Audio converter: MP3 / M4A → WebM (Opus)
 * Requires: ffmpeg installed on the system
 * Usage:
 *   node convert-to-webm.js input.mp3
 *   node convert-to-webm.js input.m4a output.webm
 *   node convert-to-webm.js input.mp3 --bitrate 128k
 */

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// ── Parse CLI args ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: node convert-to-webm.js <input> [output] [options]

Arguments:
  input       Path to input audio file (.mp3 or .m4a)
  output      (optional) Path to output file (default: same name with .webm)

Options:
  --bitrate   Opus bitrate, e.g. 96k, 128k, 192k (default: 128k)
  --help      Show this help message
`);
  process.exit(0);
}

let inputFile = null;
let outputFile = null;
let bitrate = "192k";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--bitrate") {
    bitrate = args[++i];
  } else if (!inputFile) {
    inputFile = args[i];
  } else if (!outputFile) {
    outputFile = args[i];
  }
}

// ── Validate input ────────────────────────────────────────────────────────────

if (!inputFile) {
  console.error("Error: No input file specified.");
  process.exit(1);
}

const supportedExtensions = [".mp3", ".m4a", ".aac", ".wav", ".ogg", ".flac"];
const ext = path.extname(inputFile).toLowerCase();

if (!supportedExtensions.includes(ext)) {
  console.warn(
    `Warning: "${ext}" is not a typical input format. Supported: ${supportedExtensions.join(", ")}`,
  );
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: "${inputFile}"`);
  process.exit(1);
}

// ── Resolve output path ───────────────────────────────────────────────────────

if (!outputFile) {
  const base = path.basename(inputFile, path.extname(inputFile));
  const dir = path.dirname(inputFile);
  outputFile = path.join(dir, `${base}.webm`);
}

// ── Check ffmpeg availability ─────────────────────────────────────────────────

function checkFfmpeg() {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", ["-version"]);
    proc.on("error", () =>
      reject(
        new Error(
          "ffmpeg not found. Please install it:\n" +
            "  macOS:   brew install ffmpeg\n" +
            "  Ubuntu:  sudo apt install ffmpeg\n" +
            "  Windows: https://ffmpeg.org/download.html",
        ),
      ),
    );
    proc.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error("ffmpeg check failed")),
    );
  });
}

// ── Convert ───────────────────────────────────────────────────────────────────

function convert(input, output, bitrate) {
  return new Promise((resolve, reject) => {
    console.log(`\nConverting: ${input}`);
    console.log(`Output:     ${output}`);
    console.log(`Codec:      libopus @ ${bitrate}\n`);

    const ffmpegArgs = [
      "-i",
      input, // input file
      "-c:a",
      "libopus", // Opus audio codec
      "-b:a",
      bitrate, // audio bitrate
      "-vbr",
      "on", // variable bitrate for better quality
      "-compression_level",
      "10", // highest compression (slower but smaller)
      "-application",
      "audio", // optimised for general audio (vs voip/lowdelay)
      "-y", // overwrite output without asking
      output,
    ];

    const proc = spawn("ffmpeg", ffmpegArgs);

    // ffmpeg writes progress info to stderr
    proc.stderr.on("data", (data) => {
      const line = data.toString();
      // Print only the progress/time lines to keep output tidy
      if (line.includes("time=") || line.includes("size=")) {
        process.stdout.write(`\r${line.trim().substring(0, 80)}`);
      }
    });

    proc.on("error", (err) =>
      reject(new Error(`Failed to spawn ffmpeg: ${err.message}`)),
    );

    proc.on("close", (code) => {
      process.stdout.write("\n");
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
  });
}

// ── Print file size comparison ────────────────────────────────────────────────

function printStats(input, output) {
  const inSize = fs.statSync(input).size;
  const outSize = fs.statSync(output).size;
  const ratio = ((1 - outSize / inSize) * 100).toFixed(1);
  const fmt = (n) => (n / 1024).toFixed(1) + " KB";

  console.log("─".repeat(40));
  console.log(`Input size:  ${fmt(inSize)}`);
  console.log(`Output size: ${fmt(outSize)}`);
  console.log(`Reduction:   ${ratio}%`);
  console.log("─".repeat(40));
  console.log(`Done! → ${output}\n`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  try {
    await checkFfmpeg();
    await convert(inputFile, outputFile, bitrate);
    printStats(inputFile, outputFile);
  } catch (err) {
    console.error(`\nError: ${err.message}`);
    process.exit(1);
  }
})();
