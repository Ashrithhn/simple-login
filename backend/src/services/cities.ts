/**
 * City data and service. Uses MySQL for city persistence.
 */

import { query } from "../config/db";

export interface CityTrafficInfo {
  /** 0–100 congestion index (higher = worse traffic). */
  congestionIndex: number;
  /** Average one‑way commute time in minutes. */
  avgCommuteMinutes: number;
  /** 0–100 score for public transport quality. */
  publicTransportScore: number;
}

export interface CityQualityOfLife {
  /** 0–100 safety perception index. */
  safetyIndex: number;
  /** 0–100 overall quality of life index. */
  qualityOfLifeIndex: number;
}

export interface CityClimate {
  type: string;
  avgHighC: number;
  avgLowC: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  population: number;
  description: string;
  landmarks: string[];
  /** Two‑letter ISO country code (for flags, etc.). */
  countryCode: string;
  /** Geographic region/continent label. */
  region: string;
  timezone: string;
  areaKm2: number;
  densityPerKm2: number;
  traffic: CityTrafficInfo;
  qualityOfLife: CityQualityOfLife;
  climate: CityClimate;
  /** Public URL to hero/cover image for the city. */
  imageUrl: string;
  /** Short marketing tagline used across the UI. */
  tagline: string;
  /** Free‑form keywords used for search/filtering. */
  keywords: string[];
}

type CityEnrichment = Omit<
  City,
  "id" | "name" | "country" | "population" | "description" | "landmarks"
>;

const CITY_ENRICHMENTS: Record<string, CityEnrichment> = {
  CITY1_UUID: {
    countryCode: "JP",
    region: "Asia",
    timezone: "Asia/Tokyo",
    areaKm2: 2194,
    densityPerKm2: Math.round(37400000 / 2194),
    traffic: {
      congestionIndex: 76,
      avgCommuteMinutes: 45,
      publicTransportScore: 95,
    },
    qualityOfLife: {
      safetyIndex: 82,
      qualityOfLifeIndex: 88,
    },
    climate: {
      type: "Humid subtropical",
      avgHighC: 23,
      avgLowC: 14,
    },
    imageUrl: "",
    tagline: "Neon lights, ancient temples, and endless energy.",
    keywords: ["tech", "megacity", "nightlife", "sushi", "Japan"],
  },
  CITY2_UUID: {
    countryCode: "FR",
    region: "Europe",
    timezone: "Europe/Paris",
    areaKm2: 105,
    densityPerKm2: Math.round(11000000 / 105),
    traffic: {
      congestionIndex: 68,
      avgCommuteMinutes: 38,
      publicTransportScore: 89,
    },
    qualityOfLife: {
      safetyIndex: 71,
      qualityOfLifeIndex: 84,
    },
    climate: {
      type: "Oceanic",
      avgHighC: 20,
      avgLowC: 11,
    },
    imageUrl: "",
    tagline: "Art, fashion, and romance along the Seine.",
    keywords: ["art", "fashion", "France", "Eiffel Tower", "Europe"],
  },
  CITY3_UUID: {
    countryCode: "US",
    region: "North America",
    timezone: "America/New_York",
    areaKm2: 789,
    densityPerKm2: Math.round(18800000 / 789),
    traffic: {
      congestionIndex: 83,
      avgCommuteMinutes: 49,
      publicTransportScore: 80,
    },
    qualityOfLife: {
      safetyIndex: 64,
      qualityOfLifeIndex: 79,
    },
    climate: {
      type: "Humid subtropical / continental",
      avgHighC: 19,
      avgLowC: 9,
    },
    imageUrl: "",
    tagline: "The city that never sleeps and never stops.",
    keywords: ["finance", "Broadway", "USA", "skyscrapers", "North America"],
  },
  CITY4_UUID: {
    countryCode: "GB",
    region: "Europe",
    timezone: "Europe/London",
    areaKm2: 1572,
    densityPerKm2: Math.round(9000000 / 1572),
    traffic: {
      congestionIndex: 72,
      avgCommuteMinutes: 42,
      publicTransportScore: 92,
    },
    qualityOfLife: {
      safetyIndex: 78,
      qualityOfLifeIndex: 86,
    },
    climate: {
      type: "Temperate oceanic",
      avgHighC: 17,
      avgLowC: 9,
    },
    imageUrl: "",
    tagline: "Royal history meets modern global finance.",
    keywords: ["UK", "museums", "finance", "Europe", "Thames"],
  },
  CITY5_UUID: {
    countryCode: "AU",
    region: "Oceania",
    timezone: "Australia/Sydney",
    areaKm2: 12368,
    densityPerKm2: Math.round(5300000 / 12368),
    traffic: {
      congestionIndex: 55,
      avgCommuteMinutes: 35,
      publicTransportScore: 78,
    },
    qualityOfLife: {
      safetyIndex: 85,
      qualityOfLifeIndex: 90,
    },
    climate: {
      type: "Subtropical",
      avgHighC: 24,
      avgLowC: 16,
    },
    imageUrl: "",
    tagline: "Sun, surf, and a skyline on the harbour.",
    keywords: ["beach", "Australia", "harbour", "Oceania", "outdoors"],
  },
};

function mapRowToCity(row: any): City {
  const landmarks = JSON.parse(row.landmarks || "[]") as string[];
  const enrichment: CityEnrichment =
    CITY_ENRICHMENTS[row.id] ??
    ({
      countryCode: "",
      region: "",
      timezone: "UTC",
      areaKm2: 0,
      densityPerKm2: 0,
      traffic: {
        congestionIndex: 0,
        avgCommuteMinutes: 0,
        publicTransportScore: 0,
      },
      qualityOfLife: {
        safetyIndex: 0,
        qualityOfLifeIndex: 0,
      },
      climate: {
        type: "Unknown",
        avgHighC: 0,
        avgLowC: 0,
      },
      imageUrl: "",
      tagline: "",
      keywords: [],
    } as CityEnrichment);

  return {
    id: row.id,
    name: row.name,
    country: row.country,
    population: row.population,
    description: row.description,
    landmarks,
    ...enrichment,
  };
}

export async function getAllCities(): Promise<City[]> {
  const rows = await query("SELECT * FROM cities ORDER BY population DESC");
  return rows.map(mapRowToCity);
}

export async function getCityById(id: string): Promise<City | undefined> {
  const rows = await query("SELECT * FROM cities WHERE id = ?", [id]);
  if (rows.length === 0) return undefined;
  return mapRowToCity(rows[0]);
}
