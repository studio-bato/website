#!/usr/bin/env node
// Dump MongoDB collections into data/json/*.json
// Usage: node tools/dump-mongo.js [--uri mongodb://...] [--db studiobato]

import { MongoClient } from "mongodb";
import { writeFileSync, existsSync } from "fs";
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

const collections = ["genres", "artists", "releases"];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to ${uri} / ${dbName}`);

  for (const name of collections) {
    const data = await db
      .collection(name)
      .find({}, { projection: { _id: 0 } })
      .toArray();
    const filePath = resolve(root, "data/json", `${name}.json`);
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(
      `  ${name}: ${data.length} documents written to data/json/${name}.json`,
    );
  }

  console.log("Done.");
} finally {
  await client.close();
}
