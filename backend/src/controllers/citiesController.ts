/**
 * Handles HTTP requests for city-related endpoints.
 */

import { Request, Response } from "express";
import { getAllCities, getCityById } from "../services/cities";

export async function listCities(_req: Request, res: Response): Promise<void> {
  try {
    const cities = await getAllCities();
    res.json(cities);
  } catch (error) {
    // Basic fallback; a real project might use centralized error handling
    // and structured error responses.
    // eslint-disable-next-line no-console
    console.error("Error listing cities", error);
    res.status(500).json({ error: "Failed to load cities" });
  }
}

export async function getCity(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const city = await getCityById(id);
    if (!city) {
      res.status(404).json({ error: "City not found" });
      return;
    }
    res.json(city);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error loading city", error);
    res.status(500).json({ error: "Failed to load city" });
  }
}
