import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';  // Add your styling here

const ThankYou = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');  
  const [otpSent, setOtpSent] = useState(false); 
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  // Step 1: Request OTP for account deletion
  const handleGetOtp = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');  // Clear any existing error
    setLoading(true);
    try {
      // Send email to the backend to generate OTP
      const response = await axios.post('http://localhost:5000/api/users/send-otp', { email });
      if (response.status === 200) {
        setOtpSent(true);  // Mark OTP as sent
        alert('OTP sent to your email!');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP verification and account deletion
  const handleDeleteAccount = async () => {
    console.log('Email:', email);
    console.log('OTP:', otp);  
    
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    setError('');  // Clear any existing error
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/delete-account', {
        email,
        otp,
      });

      if (response.status === 200) {
        alert('Account deleted successfully!');
        navigate('/');  // Redirect to login page after account deletion
      }
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Error deleting account. Please check OTP and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="thank-you-container">
      <h2 className="thank-you-heading">Thank You!</h2>
      <p className="thank-you-message">
        Your account has been successfully created. If you'd like to delete your account, please follow the steps below.
      </p>

      <div className="account-actions">
        <input
          type="email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to receive OTP"
        />
        <button
          className="get-otp-button"
          onClick={handleGetOtp}
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Get OTP'}
        </button>

        {otpSent && (
          <>
            <input
              type="text"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button
              className="delete-button"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Remove Account'}
            </button>
          </>
        )}

        {error && <div className="error-message">{}</div>}
        <h1>successfully deleted</h1>
      </div>
    </div>
  );
};

export default ThankYou;
