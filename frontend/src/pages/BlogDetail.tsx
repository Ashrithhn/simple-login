/**
 * Single blog post view.
 */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../services/blogApi';
import type { BlogPost } from '../services/blogApi';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getPost(id)
      .then(setPost)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container-md">Loading...</div>;
  if (error) return <div className="container-md error-message">Error: {error}</div>;
  if (!post) return <div className="container-md">Post not found.</div>;

  return (
    <div className="container-md">
      <Link to="/blog" style={{ marginBottom: '1rem', display: 'block' }}>← Back to Blog</Link>
      <h1>{post.title}</h1>
      <p style={{ color: '#666' }}>
        by {post.authorName} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
    </div>
  );
}
