/**
 * Shared types for city data.
 *
 * Mirrors the backend `City` shape but is intentionally
 * frontend‑centric (read‑only, no DB concerns).
 */

export interface CityTrafficInfo {
  congestionIndex: number;
  avgCommuteMinutes: number;
  publicTransportScore: number;
}

export interface CityQualityOfLife {
  safetyIndex: number;
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
  countryCode: string;
  region: string;
  timezone: string;
  areaKm2: number;
  densityPerKm2: number;
  traffic: CityTrafficInfo;
  qualityOfLife: CityQualityOfLife;
  climate: CityClimate;
  imageUrl: string;
  tagline: string;
  keywords: string[];
}
