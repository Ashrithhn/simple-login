/**
 * Home page. Entry point with links to main features.
 */

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>City Information</h1>
      <p>Explore cities around the world, read the blog, and more.</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/cities">Browse Cities</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/info">About</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
