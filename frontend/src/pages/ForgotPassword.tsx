import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import * as authApi from '../services/authApi';
import { validateEmail, validatePassword } from '../utils/validation';

type Step = 'email' | 'otp' | 'reset-password' | 'success';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; otp?: string; newPassword?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  // Step 1: Request OTP
  async function handleRequestOTP(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setFieldErrors({ email: emailValidation.error });
      return;
    }

    setLoading(true);
    try {
      await authApi.requestPasswordReset(email);
      setStep('otp');
      setResendCountdown(60);
      const countdown = setInterval(() => {
        setResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify OTP
  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!otp.trim()) {
      setFieldErrors({ otp: 'OTP is required' });
      return;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setFieldErrors({ otp: 'OTP must be 6 digits' });
      return;
    }

    setLoading(true);
    try {
      await authApi.verifyOTP(email, otp);
      setStep('reset-password');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // Step 3: Reset Password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors: { newPassword?: string; confirmPassword?: string } = {};

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      errors.newPassword = passwordValidation.error;
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword(email, otp, newPassword);
      setStep('success');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleResendOTP() {
    setLoading(true);
    authApi.requestPasswordReset(email)
      .then(() => {
        setError('');
        setResendCountdown(60);
        const countdown = setInterval(() => {
          setResendCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch(err => setError((err as Error).message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.wrapper}>
          <div style={styles.card}>

            {step === 'email' && (
              <>
                <h2 style={styles.title}>Forgot Password</h2>
                <p style={styles.subtext}>Enter your email to reset your password</p>
                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleRequestOTP} style={styles.form}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      placeholder="Enter registered email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFieldErrors({ ...fieldErrors, email: undefined });
                      }}
                      style={styles.input}
                    />
                    {fieldErrors.email && <p style={styles.fieldError}>{fieldErrors.email}</p>}
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
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>
              </>
            )}

            {step === 'otp' && (
              <>
                <h2 style={styles.title}>Verify OTP</h2>
                <p style={styles.subtext}>Enter the 6-digit code sent to {email}</p>
                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleVerifyOTP} style={styles.form}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>OTP Code</label>
                    <input
                      type="text"
                      value={otp}
                      placeholder="000000"
                      maxLength={6}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                        setFieldErrors({ ...fieldErrors, otp: undefined });
                      }}
                      style={{ ...styles.input, letterSpacing: '4px', textAlign: 'center', fontSize: '18px' }}
                    />
                    {fieldErrors.otp && <p style={styles.fieldError}>{fieldErrors.otp}</p>}
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
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>

                  <button
                    type="button"
                    disabled={resendCountdown > 0 || loading}
                    onClick={handleResendOTP}
                    style={{ ...styles.secondaryButton, opacity: resendCountdown > 0 ? 0.6 : 1 }}
                  >
                    {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code'}
                  </button>
                </form>
              </>
            )}

            {step === 'reset-password' && (
              <>
                <h2 style={styles.title}>Reset Password</h2>
                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleResetPassword} style={styles.form}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>New Password</label>
                    <div style={styles.passwordWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        placeholder="New password"
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setFieldErrors({ ...fieldErrors, newPassword: undefined });
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
                    {fieldErrors.newPassword && <p style={styles.fieldError}>{fieldErrors.newPassword}</p>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm new password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
                      }}
                      style={styles.input}
                    />
                    {fieldErrors.confirmPassword && <p style={styles.fieldError}>{fieldErrors.confirmPassword}</p>}
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
                    {loading ? 'Resetting...' : 'Set New Password'}
                  </button>
                </form>
              </>
            )}

            {step === 'success' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '3rem', color: '#22c55e', marginBottom: '1rem' }}>✓</div>
                <h2 style={{ ...styles.title, color: '#22c55e' }}>Success!</h2>
                <p style={{ ...styles.subtext, marginBottom: '2rem' }}>
                  Your password has been reset successfully.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    ...styles.button,
                    backgroundColor: "#22c55e",
                  }}
                >
                  Go to Login
                </button>
              </div>
            )}

            {step !== 'success' && (
              <div style={styles.linksContainer}>
                <Link to="/login" style={styles.link}>Back to Login</Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

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
    marginBottom: "8px",
    fontSize: "20px",
    fontWeight: 700,
    color: "#1f2937",
  },
  subtext: {
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
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
    marginTop: "4px",
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: 600,
    transition: "all 0.25s ease",
    width: '100%',
  },
  secondaryButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '5px',
    alignSelf: 'center',
  },
  error: {
    color: "red",
    fontSize: "13px",
    textAlign: "center" as const,
    marginBottom: '1rem',
    background: '#fee2e2',
    padding: '8px',
    borderRadius: '4px',
  },
  fieldError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '0.2rem',
  },
  linksContainer: {
    marginTop: "20px",
    textAlign: "center" as const,
    borderTop: '1px solid #f3f4f6',
    paddingTop: '15px',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: "14px",
  },
};
