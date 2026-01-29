/**
 * Create new blog post (admin only).
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../services/blogApi';

export default function BlogNew() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    return (
      <div className="container-md">
        <p>Admin only. Please log in as admin.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError('');
    setLoading(true);
    try {
      const post = await createPost(token, title, content);
      navigate(`/blog/${post.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-md">
      <h1>New post</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={10} />
        </div>
        <button type="submit" disabled={loading}>Publish</button>
      </form>
    </div>
  );
}
