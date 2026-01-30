/**
 * User registration page with full validation
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from '../context/AuthContext';
import { validateRegisterForm } from '../utils/validation';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState(""); // Removed phone from MVP based on backend requirements
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Client-side validation using shared utility
    const validation = validateRegisterForm(email, password, name);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name);
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
            <h2 style={styles.title}>Register</h2>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFieldErrors({ ...fieldErrors, name: undefined });
                  }}
                  style={styles.input}
                />
                {fieldErrors.name && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem' }}>{fieldErrors.name}</p>}
              </div>

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

              {/* 
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="10 digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              /> 
              */}

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Create Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                    style={styles.input}
                  />
                </div>
                {fieldErrors.password && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem' }}>{fieldErrors.password}</p>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Re-enter Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.showBtn}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  backgroundColor: loading ? "#ccc" : (isHover ? "#1d4ed8" : "#2563eb"),
                  transform: (!loading && isHover) ? "translateY(-2px)" : "translateY(0)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p style={styles.link}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
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
    paddingTop: NAVBAR_HEIGHT,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },
  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
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
    color: "#fff",
    border: "none",
    borderRadius: "6px",
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
  link: {
    textAlign: "center" as const,
    marginTop: "12px",
    fontSize: "14px",
  },
};

export default Register;
