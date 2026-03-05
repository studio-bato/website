#!/usr/bin/env node
// Seed MongoDB with data from data/json/*.json
// Usage: node tools/seed-mongo.js [--uri mongodb://...] [--db studiobato]

import { MongoClient } from "mongodb";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");

for (const file of [".env.local", ".env"]) {
  const p = resolve(root, file);
  if (existsSync(p)) { process.loadEnvFile(p); break; }
}

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const uri =
  getArg("--uri") ?? process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const dbName = getArg("--db") ?? process.env.MONGODB_DB ?? "studiobato";

const load = (file) =>
  JSON.parse(readFileSync(resolve(root, "data/json", file), "utf-8"));

const collections = [
  { name: "genres", data: load("genres.json") },
  { name: "artists", data: load("artists.json") },
  { name: "releases", data: load("releases.json") },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to ${uri} / ${dbName}`);

  for (const { name, data } of collections) {
    const col = db.collection(name);
    await col.deleteMany({});
    if (data.length > 0) {
      await col.insertMany(data);
    }
    console.log(`  ${name}: ${data.length} documents inserted`);
  }

  console.log("Done.");
} finally {
  await client.close();
}
