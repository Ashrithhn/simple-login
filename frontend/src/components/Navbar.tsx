import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Landing page
  const isLandingPage = location.pathname === "/";

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        {!isLandingPage && (
          <Link to="/" style={styles.icon}>
            <FaHome size={18} />
          </Link>
        )}
        <span style={styles.logo}>City Info Portal</span>
      </div>

      <div style={styles.right}>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/blog/new" style={styles.link}>New Post</Link>
            )}
            <span style={styles.userInfo}>Welcome, {user.name}</span>
            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        ) : (
          isLandingPage && (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;


const styles = {
  navbar: {
    height: "56px",
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    color: "#fff",
    position: "fixed" as const,
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  right: {
    display: "flex",
    gap: "18px",
  },
  logo: {
    fontSize: "16px",
    fontWeight: 600,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    transition: "opacity 0.2s",
  },
  icon: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
  },
  registerBtn: {
    color: "#2563eb",
    backgroundColor: "#fff",
    padding: "6px 14px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
  },
  userInfo: {
    fontSize: "14px",
    marginRight: "10px",
  },
  logoutBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "background 0.2s",
  },
};
