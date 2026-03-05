import type { Artist, Genre, Release } from "@/data/schemas";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB ?? "studiobato";

let client: MongoClient | null = null;

const getClient = async (): Promise<MongoClient> => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
};

const getCollection = async <T extends object>(name: string) => {
  const c = await getClient();
  return c.db(dbName).collection<T>(name);
};

export const getGenresStorage = async (): Promise<Array<Genre>> => {
  const col = await getCollection<Genre>("genres");
  return col.find({}, { projection: { _id: 0 } }).toArray();
};

export const getArtistsStorage = async (): Promise<Array<Artist>> => {
  const col = await getCollection<Artist>("artists");
  return col.find({}, { projection: { _id: 0 } }).toArray();
};

export const getReleasesStorage = async (): Promise<Array<Release>> => {
  const col = await getCollection<Release>("releases");
  return col.find({}, { projection: { _id: 0 } }).toArray();
};

const saveCollection = async <T extends object>(
  name: string,
  data: Array<T>,
): Promise<void> => {
  const col = await getCollection<T>(name);
  await col.deleteMany({});
  if (data.length > 0) await col.insertMany(data as any);
};

export const saveGenresStorage = async (data: Array<Genre>): Promise<void> => {
  await saveCollection("genres", data);
};

export const saveArtistsStorage = async (
  data: Array<Artist>,
): Promise<void> => {
  await saveCollection("artists", data);
};

export const saveReleasesStorage = async (
  data: Array<Release>,
): Promise<void> => {
  await saveCollection("releases", data);
};
