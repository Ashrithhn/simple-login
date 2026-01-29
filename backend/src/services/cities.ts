/**
 * City data and service. Uses MySQL for city persistence.
 */

import { query } from '../config/db';

export interface City {
  id: string;
  name: string;
  country: string;
  population: number;
  description: string;
  landmarks: string[];
}

function mapRowToCity(row: any): City {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    population: row.population,
    description: row.description,
    landmarks: JSON.parse(row.landmarks || '[]'), // Parse JSON string to array
  };
}

export async function getAllCities(): Promise<City[]> {
  const rows = await query('SELECT * FROM cities');
  return rows.map(mapRowToCity);
}

export async function getCityById(id: string): Promise<City | undefined> {
  const rows = await query('SELECT * FROM cities WHERE id = ?', [id]);
  if (rows.length === 0) return undefined;
  return mapRowToCity(rows[0]);
}
