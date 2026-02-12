import { Features } from "./types";

const features: Features = {
  heroYTEmbed: [
    "b5k_VVeF-DU",
    "pUBC_AoIMEQ",
    "i1xlly2dhuw",
    "2UbtaPJYooY",
    "81I4FjL536c",
    "7ObleKGO7_A",
    "YzA5wr0vuCA",
    "2iZkqFfV-ug",
    "WrD1p7o_8NQ",
    "7ObleKGO7_A",
    "YzA5wr0vuCA",
    "HU3lwfjclsQ",
    "3Irj_v-ub5I",
    "2UbtaPJYooY",
  ],
};

export function getRandomFeatures() {
  return {
    heroYTEmbed:
      features.heroYTEmbed[
        Math.floor(Math.random() * features.heroYTEmbed.length)
      ],
  };
}
