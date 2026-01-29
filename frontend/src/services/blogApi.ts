/**
 * Blog API client: list posts, get post, create post (admin).
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

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

export async function getPosts(): Promise<BlogPost[]> {
  return fetchApi<BlogPost[]>('/blog');
}

export async function getPost(idOrSlug: string): Promise<BlogPost> {
  return fetchApi<BlogPost>(`/blog/${idOrSlug}`);
}

export async function createPost(token: string, title: string, content: string): Promise<BlogPost> {
  return fetchApi<BlogPost>('/blog', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title, content }),
  });
}
