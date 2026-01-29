/**
 * Auth API client: login, register, logout, me.
 */

import type { User } from '../types/auth';

const API = '/api';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || res.statusText);
  return data as T;
}

export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  return fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<{ user: User; token: string }> {
  return fetchApi('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name }) });
}

export async function logout(token: string): Promise<void> {
  await fetch(`${API}/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function me(token: string): Promise<User> {
  return fetchApi('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}
