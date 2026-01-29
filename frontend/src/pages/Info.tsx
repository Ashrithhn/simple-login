import { Link } from 'react-router-dom';

export default function Info() {
  return (
    <div className="container-md" style={{ lineHeight: 1.6 }}>
      <h1>About City Information</h1>
      <p>Explore city information, read the blog, and use admin features when logged in.</p>
      <h2>Features</h2>
      <ul>
        <li><Link to="/cities">Cities</Link> – Browse cities and details.</li>
        <li><Link to="/blog">Blog</Link> – Read posts. Admins can create posts.</li>
        <li><Link to="/login">Login</Link> – Sign in as user or admin.</li>
        <li><Link to="/register">Register</Link> – Create a user account.</li>
      </ul>
      <h2>Admin</h2>
      <p>Default admin: <strong>admin@example.com</strong> / <strong>admin123</strong>. Create blog posts after logging in as admin.</p>
      <p><Link to="/">Back to Home</Link></p>
    </div>
  );
}
