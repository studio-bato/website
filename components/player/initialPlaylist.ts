import { PlayerTrack } from "./context";
import { shuffle, mapReleaseToPlayer } from "./utils";

import { releases } from "@/data";

export const getInitialPlaylist: () => Array<PlayerTrack> = () =>
  shuffle(releases.map(mapReleaseToPlayer).flat());
