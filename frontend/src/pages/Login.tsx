/**
 * User and admin login page.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate form
    const validation = validateLoginForm(email, password);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      console.log("Login Data:", { email, password });
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.wrapper}>
          <div style={styles.card}>

            <h2 style={styles.title}>Login</h2>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  style={styles.input}
                />
                {fieldErrors.email && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem' }}>{fieldErrors.email}</p>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                    style={styles.input}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.showBtn}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {fieldErrors.password && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem' }}>{fieldErrors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  backgroundColor: loading ? "#ccc" : (isHover ? "#1d4ed8" : "#2563eb"),
                  transform: (!loading && isHover) ? "translateY(-2px)" : "translateY(0)",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: (!loading && isHover)
                    ? "0 8px 20px rgba(37, 99, 235, 0.4)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <div style={styles.linksContainer}>
              <p style={styles.link}>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
              <p style={styles.link}>
                <Link to="/forgot-password" style={{ color: '#2563eb', fontWeight: 500 }}>Forgot Password?</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

const NAVBAR_HEIGHT = "56px";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    paddingTop: NAVBAR_HEIGHT, // NAVBAR HEIGHT
  },

  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "40px", // space below navbar
  },

  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "16px",
  },

  headline: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1f2937",
  },

  subtext: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px",
  },

  title: {
    textAlign: "center" as const,
    marginBottom: "14px",
    fontSize: "18px",
  },

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },

  input: {
    width: '100%',
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: 'border-box' as const,
  },

  passwordWrapper: {
    position: "relative" as const,
  },

  showBtn: {
    position: "absolute" as const,
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: 600,
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    transition: "all 0.25s ease",
  },


  error: {
    color: "red",
    fontSize: "13px",
    textAlign: "center" as const,
    marginBottom: '1rem',
  },

  linksContainer: {
    marginTop: "12px",
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
  },

  link: {
    textAlign: "center" as const,
    fontSize: "14px",
    margin: 0,
  },
};

export default Login;
