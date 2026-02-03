/**
 * User and admin login page with animated traffic signal.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { validateLoginForm } from "../utils/validation";

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
    setError("");
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
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-page__left">
          <div className="login-scene">
            <div className="login-signal">
              <div className="login-signal__head">
                <span className="login-signal__light login-signal__light--red" />
                <span className="login-signal__light login-signal__light--yellow" />
                <span className="login-signal__light login-signal__light--green" />
              </div>
              <div className="login-signal__pole" />
            </div>
            <div className="login-road">
              <div className="login-road__line" />
              <div className="login-car">
                <div className="login-car__body">
                  <div className="login-car__window" />
                </div>
                <div className="login-car__wheels">
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <p className="login-scene__caption">
              Lights guide the way. Securely sign in to explore the city.
            </p>
          </div>
        </div>

        <div className="login-page__right">
          <div className="login-card">
            <div className="login-card__header">
              <h2>Login</h2>
              <p>Access your dashboard, blogs, and city analytics.</p>
            </div>

            {error && <p className="login-card__error">{error}</p>}

            <form onSubmit={handleSubmit} className="login-card__form">
              <div className="login-card__field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                />
                {fieldErrors.email && (
                  <p className="login-card__field-error">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="login-card__field">
                <label>Password</label>
                <div className="login-card__password">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                  />

                  <button
                    type="button"
                    className="login-card__show"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="login-card__field-error">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`login-card__submit ${
                  !loading && isHover ? "login-card__submit--hover" : ""
                }`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="login-card__links">
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
