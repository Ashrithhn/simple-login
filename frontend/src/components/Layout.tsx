/**
 * Main application layout with navigation.
 */

import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, loading, logout } = useAuth();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/info">Info</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/blog">Blog</Link>
        {!loading && (
          user ? (
            <>
              {user.role === 'admin' && <Link to="/blog/new">New post</Link>}
              <span>{user.name}</span>
              <button type="button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
