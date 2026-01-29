/**
 * Handles HTTP requests for city-related endpoints.
 */

import { Request, Response } from 'express';
import { getAllCities, getCityById } from '../services/cities';

export function listCities(_req: Request, res: Response): void {
  const cities = getAllCities();
  res.json(cities);
}

export function getCity(req: Request, res: Response): void {
  const { id } = req.params;
  const city = getCityById(id);
  if (!city) {
    res.status(404).json({ error: 'City not found' });
    return;
  }
  res.json(city);
}
