import { GenresSchema, Genres } from "./schemas";
import genresData from "@/data/genres.json";

export const genres: Genres = GenresSchema.parse(genresData);
