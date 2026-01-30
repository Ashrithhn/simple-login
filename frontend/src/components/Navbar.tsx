import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

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

      {isLandingPage && (
        <div style={styles.right}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.registerBtn}>Register</Link>
        </div>
      )}
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
    transition:"opacity 0.2s",
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

};
