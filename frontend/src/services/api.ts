/**
 * API client for backend. Uses Vite proxy so /api goes to backend.
 */

import type { City } from '../types/city';

const API_BASE = '/api';

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || 'Request failed');
  }
  return res.json();
}

export async function getCities(): Promise<City[]> {
  return fetchApi<City[]>('/cities');
}

export async function getCityById(id: string): Promise<City> {
  return fetchApi<City>(`/cities/${id}`);
}
