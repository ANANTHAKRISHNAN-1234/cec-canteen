import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './FP.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      history.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Oops! Forgot your password?</h1>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label className="forgot-password-label">
          Email:
          <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} className="forgot-password-input" />
        </label>
        <button type="submit" className="forgot-password-button">Reset Password</button>
      </form>
      {error && <p className="forgot-password-error">{error}</p>}
      <p className="forgot-password-link">
        Remember your password? <Link to="/login" className="forgot-password-link-text">Log in</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;