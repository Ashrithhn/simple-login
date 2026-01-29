/**
 * Blog posts. Uses MySQL for persistence; admin can create.
 */

import crypto from 'crypto';
import { query } from '../config/db';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

function mapRowToBlogPost(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    authorId: row.author_id,
    authorName: row.author_name,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await query('SELECT * FROM blog_posts ORDER BY created_at DESC');
  return rows.map(mapRowToBlogPost);
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const rows = await query('SELECT * FROM blog_posts WHERE id = ?', [id]);
  if (rows.length === 0) return undefined;
  return mapRowToBlogPost(rows[0]);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const rows = await query('SELECT * FROM blog_posts WHERE slug = ?', [slug]);
  if (rows.length === 0) return undefined;
  return mapRowToBlogPost(rows[0]);
}

export async function createPost(title: string, content: string, authorId: string, authorName: string): Promise<BlogPost> {
  const id = crypto.randomUUID();
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const createdAt = new Date().toISOString();

  await query('INSERT INTO blog_posts (id, title, slug, content, author_id, author_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    id, title, slug, content, authorId, authorName, createdAt,
  ]);

  return { id, title, slug, content, authorId, authorName, createdAt };
}
