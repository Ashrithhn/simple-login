/**
 * Blog HTTP handlers: list, get one, create (admin).
 */

import { Request, Response } from 'express';
import * as blogService from '../services/blog';

export function listPosts(_req: Request, res: Response): void {
  res.json(blogService.getAllPosts());
}

export function getPost(req: Request, res: Response): void {
  const { id } = req.params;
  const post = blogService.getPostById(id) ?? blogService.getPostBySlug(id);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  res.json(post);
}

export function createPost(req: Request, res: Response): void {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Admin only' });
    return;
  }
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }
  const post = blogService.createPost(title, content, user.id, user.name);
  res.status(201).json(post);
}