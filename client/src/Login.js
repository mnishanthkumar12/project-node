// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       // Send login request to the server
//       const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
//       // Check if the OTP was successfully sent and then navigate to the OTP verification page
//       if (response.status === 200) {
//         alert('OTP sent to your email');
//         navigate('/thank-you');
//       }
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   const handleOtpVerification = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/verify-otp', { otp });
//       if (response.status === 200) {
//         alert('OTP verified');
//         navigate('/thank-you');
//       }
//     } catch (err) {
//       setError('Invalid OTP');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//       <br />
//       {error && <div>{error}</div>}
//       <input
//         type="text"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="Enter OTP"
//       />
//       <button onClick={handleOtpVerification}>Verify OTP</button>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import the styling file

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       // Send login request to the server
//       const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
//       // If login is successful, redirect to the "Thank You" page
//       if (response.status === 200) {
//         navigate('/thank-you');
//       }
//     } catch (err) {
//       setError('Invalid credentials, please try again.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="input-group">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//         </div>
//         <button type="button" onClick={handleLogin} className="btn-login">
//           Login
//         </button>
//         {error && <div className="error-message">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the styling file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      // If login is successful, redirect to the "Thank You" page
      if (response.status === 200) {
        navigate('/thank-you');
      }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };
  const handleNavigateToRegister = () => {
    navigate('/register');  // This navigates to the /register route
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="button" onClick={handleLogin} className="btn-login">
          Login
        </button>


        {error && <div className="error-message">{error}</div>}
        <div></div>
        <br></br>
        <p>Don't have an account?</p>
        {/* "Create Account" button */}
        <button className="create-account-button" onClick={handleNavigateToRegister}>
          Create Account
        </button>
      </form>
      
    </div>
    
  );
};

export default Login;
