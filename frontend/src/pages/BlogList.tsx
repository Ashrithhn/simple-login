/**
 * Blog list page. Admins see a link to create a new post.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../services/blogApi';

export default function BlogList() {
  const [posts, setPosts] = useState<{ id: string; title: string; slug: string; authorName: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    getPosts().then((list) => setPosts(list)).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container-md">Loading...</div>;
  if (error) return <div className="container-md error-message">Error: {error}</div>;

  return (
    <div className="container-md">
      <h1>Blog</h1>
      {user?.role === 'admin' && <p><Link to="/blog/new">+ Create new post</Link></p>}
      {posts.length === 0 ? <p>No posts yet.</p> : (
        <ul>
          {posts.map((p) => (
            <li key={p.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
              <Link to={`/blog/${p.id}`} style={{ fontSize: '1.1rem' }}>{p.title}</Link>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>by {p.authorName} · {new Date(p.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
