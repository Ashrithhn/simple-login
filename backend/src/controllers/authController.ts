/**
 * Auth HTTP handlers: register, login, logout, me.
 */

import { Request, Response } from 'express';
import * as authService from '../services/auth';

export function register(req: Request, res: Response): void {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, password, and name are required' });
      return;
    }
    const r = authService.register(email, password, name, role === 'admin' ? 'admin' : 'user');
    res.status(201).json(r);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export function login(req: Request, res: Response): void {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    const r = authService.login(email, password);
    res.json(r);
  } catch (e) {
    res.status(401).json({ error: (e as Error).message });
  }
}

export function logout(req: Request, res: Response): void {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) authService.logout(token);
  res.json({ ok: true });
}

export function me(req: Request, res: Response): void {
  const user = req.user;
  if (!user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json(user);
}