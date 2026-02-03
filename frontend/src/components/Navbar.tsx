import { Link, useLocation } from "react-router-dom";
import { FaCarSide, FaHome } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
        <div style={styles.brand}>
          <span style={styles.carLogo}>
            <FaCarSide size={18} />
          </span>
          <span style={styles.logoText}>CityDrive Portal</span>
        </div>
        {user && (
          <div style={styles.navLinks}>
            <Link to="/cities" style={styles.link}>
              Cities
            </Link>
            <Link to="/cities/explorer" style={styles.link}>
              Explorer
            </Link>
            <Link to="/cities/traffic" style={styles.link}>
              Traffic
            </Link>
            <Link to="/cities/gallery" style={styles.link}>
              Gallery
            </Link>
            <Link to="/blog" style={styles.link}>
              Blog
            </Link>
            <Link to="/info" style={styles.link}>
              Info
            </Link>
          </div>
        )}
      </div>

      <div style={styles.right}>
        <button
          type="button"
          onClick={toggleTheme}
          style={styles.themeToggle}
        >
          {theme === "dark" ? "Light" : "Dark"} mode
        </button>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/blog/new" style={styles.link}>
                New Post
              </Link>
            )}
            <span style={styles.userInfo}>Welcome, {user.name}</span>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          isLandingPage && (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.registerBtn}>
                Register
              </Link>
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
    background:
      "linear-gradient(90deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92))",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    color: "#fff",
    position: "fixed" as const,
    top: 0,
    width: "100%",
    zIndex: 100,
    boxShadow: "0 10px 30px rgba(15,23,42,0.7)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  right: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  carLogo: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 0, #fbbf24, #f97316 40%, #dc2626 90%)",
    boxShadow: "0 0 0 2px rgba(15,23,42,0.8)",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginLeft: "22px",
    fontSize: "13px",
  },
  link: {
    color: "#e5e7eb",
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
    color: "#0f172a",
    backgroundColor: "#f9fafb",
    padding: "6px 14px",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
  },
  userInfo: {
    fontSize: "14px",
    marginRight: "4px",
  },
  logoutBtn: {
    backgroundColor: "rgba(15,23,42,0.5)",
    border: "1px solid rgba(148,163,184,0.7)",
    color: "#e5e7eb",
    padding: "6px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "13px",
  },
  themeToggle: {
    backgroundColor: "rgba(15,23,42,0.6)",
    border: "1px solid rgba(148,163,184,0.7)",
    color: "#e5e7eb",
    padding: "4px 12px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "12px",
  },
};
