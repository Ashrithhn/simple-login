/**
 * Blog list page. Admins see a link to create a new post.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPosts } from "../services/blogApi";

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
    <div className="container-md blog-page">
      <h1>Blog</h1>
      {user?.role === "admin" && (
        <p>
          <Link to="/blog/new">+ Create new post</Link>
        </p>
      )}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {posts.map((p) => (
            <li
              key={p.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem 1.2rem",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(236,252,203,0.06))",
                border: "1px solid rgba(148,163,184,0.35)",
              }}
            >
              <Link
                to={`/blog/${p.id}`}
                style={{ fontSize: "1.1rem", fontWeight: 600 }}
              >
                {p.title}
              </Link>
              <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                by {p.authorName} ·{" "}
                {new Date(p.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
