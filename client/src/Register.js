import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company_name: '',
    age: '',
    dob: '',
    image: null,
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    const { email, password, name } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return 'Invalid email';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    if (!name) return 'Name is required';
    return '';
  };

  const handleSendOtp = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/send-otp', {
        email: formData.email,
      });
      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (err) {
      setError('Error sending OTP. Please try again.');
      console.error('Error sending OTP:', err.response || err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
        email: formData.email,
        otp: formData.otp,
      });

      if (response.status === 200) {
        handleRegister();
      }
    } catch (err) {
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('company_name', formData.company_name);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('dob', formData.dob);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post('http://localhost:5000/api/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('User registered successfully');
        alert('User registered successfully');
        navigate('/');  // Navigate to login after success
      }
    } catch (err) {
      setError('Error registering user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        </div>
        <div className="input-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="input-group">
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        </div>
        <div className="input-group">
          <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" />
        </div>
        <div className="input-group">
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        </div>
        <div className="input-group">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
        </div>
        <div className="input-group">
          <input type="file" name="image" onChange={handleImageChange} />
        </div>

        {!otpSent && (
          <button type="button" onClick={handleSendOtp} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        )}

        {otpSent && (
          <div>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
            />
            <button type="button" onClick={handleOtpVerification} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP & Register'}
            </button>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default Register;
