// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Register = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     company_name: '',
// //     age: '',
// //     dob: '',
// //     image: null,
// //   });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleImageChange = (e) => {
// //     setFormData({ ...formData, image: e.target.files[0] });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formDataObj = new FormData();
// //     for (const key in formData) {
// //       formDataObj.append(key, formData[key]);
// //     }

// //     try {
// //       await axios.post('http://localhost:5000/api/users/register', formDataObj, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });
// //       navigate('/');
// //     } catch (err) {
// //       alert('Error registering user');
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input type="text" name="name" onChange={handleChange} placeholder="Name" />
// //       <input type="email" name="email" onChange={handleChange} placeholder="Email" />
// //       <input type="password" name="password" onChange={handleChange} placeholder="Password" />
// //       <input type="text" name="company_name" onChange={handleChange} placeholder="Company Name" />
// //       <input type="number" name="age" onChange={handleChange} placeholder="Age" />
// //       <input type="date" name="dob" onChange={handleChange} placeholder="Date of Birth" />
// //       <input type="file" name="image" onChange={handleImageChange} />
// //       <button type="submit">Register</button>
// //     </form>
// //   );
// // };

// // export default Register;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     company_name: '',
//     age: '',
//     dob: '',
//     image: null,
//     otp: '',  // Add OTP state
//   });

//   const [otpSent, setOtpSent] = useState(false);  // New state to track OTP sent
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSendOtp = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/send-otp', {
//         email: formData.email,
        
//       });
//       if (response.status === 200) {
//         alert('OTP sent to your email');
//         setOtpSent(true);  // Set OTP sent flag
//       }
//     } catch (err) {
//       setError('Error sending OTP');
//       console.log(error);
//     }
//   };

//   const handleOtpVerification = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
//         email: formData.email,
//         otp: formData.otp,
//       });

//       if (response.status === 200) {
//         alert('OTP verified, proceeding with registration');
//         handleRegister();  // Proceed with registration if OTP is valid
//       }
//     } catch (err) {
//       setError('Invalid OTP');
//     }
//   };

//   const handleRegister = async () => {
//     const userData = new FormData();
//     for (const key in formData) {
//       userData.append(key, formData[key]);
//     }

//     try {
//       await axios.post('http://localhost:5000/api/users/register', userData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       navigate('/thank-you');
//     // } catch (err) {
//     //   setError('Error registering user');
//     //   console.log(err);
//     // }
//     }catch (err) {
//       if (err.response) {
//         // If there is a response from the server
//         console.log('Response error:', err.response);
//         setError(`Error registering user: ${err.response.data.message || err.response.statusText}`);
//       } else {
//         // If no response, something might be wrong with the network or the server
//         console.log('Network error:', err.message);
//         setError('Error registering user: Network issue');
//       }
//     }    
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <input type="text" name="name" onChange={handleChange} placeholder="Name" />
//         <input type="email" name="email" onChange={handleChange} placeholder="Email" />
//         <input type="password" name="password" onChange={handleChange} placeholder="Password" />
//         <input type="text" name="company_name" onChange={handleChange} placeholder="Company Name" />
//         <input type="number" name="age" onChange={handleChange} placeholder="Age" />
//         <input type="date" name="dob" onChange={handleChange} placeholder="Date of Birth" />
//         <input type="file" name="image" onChange={handleImageChange} />

//         {/* Send OTP button */}
//         {!otpSent && <button type="button" onClick={handleSendOtp}>Send OTP</button>}

//         {/* OTP verification */}
//         {otpSent && (
//           <div>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               placeholder="Enter OTP"
//             />
//             <button type="button" onClick={handleOtpVerification}>Verify OTP & Register</button>
//           </div>
//         )}

//         {error && <div>{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Register;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Register.css'; // Importing the styling

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     company_name: '',
//     age: '',
//     dob: '',
//     image: null,
//     otp: '',
//   });
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const validateForm = () => {
//     const { email, password, name } = formData;
//     if (!email || !email.includes('@')) return 'Invalid email';
//     if (!password || password.length < 6) return 'Password must be at least 6 characters';
//     if (!name) return 'Name is required';
//     return '';
//   };

//   const handleSendOtp = async () => {
//     const errorMsg = validateForm();
//     if (errorMsg) {
//       setError(errorMsg);
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     console.log('Sending email:', formData.email); // Confirm the email is correct
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/send-otp', {
//         email: formData.email,
//       });
//       if (response.status === 200) {
//         setOtpSent(true);
//       }
//     } catch (err) {
//       setError('Error sending OTP. Please try again.');
//       console.error('Error sending OTP:', err.response || err); // Log the full error response
//     } finally {
//       setIsLoading(false);
//     }
// };

  

//   const handleOtpVerification = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
//         email: formData.email,
//         otp: formData.otp,
//       });

//       if (response.status === 200) {
//         handleRegister();
//       }
//     } catch (err) {
//       setError('Invalid OTP. Please check and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleRegister = async () => {
//     setIsLoading(true);
//     setError('');
//     console.log('Sending registration data:', formData); // Log to check formData
//     try {
//         const response = await axios.post('http://localhost:5000/api/users/register', {
//             name: formData.name,
//             email: formData.email,
//             password: formData.password,
//             company_name: formData.company_name,
//             age: formData.age,
//             dob: formData.dob,
//             image: formData.image, // If you're handling image upload
//         });
//         if (response.status === 201) {
//             // Handle successful registration
//             setSuccessMessage('User registered successfully');
//         }
//     } catch (err) {
//         console.error('Error registering user:', err.response ? err.response.data : err);
//         setError('Error registering user. Please try again.');
//     } finally {
//         setIsLoading(false);
//     }
// };


//   return (
    
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="input-group">
//           <input type="text" name="name" onChange={handleChange} placeholder="Name" />
//         </div>
//         <div className="input-group">
//           <input type="email" name="email" onChange={handleChange} placeholder="Email" />
//         </div>
//         <div className="input-group">
//           <input type="password" name="password" onChange={handleChange} placeholder="Password" />
//         </div>
//         <div className="input-group">
//           <input type="text" name="company_name" onChange={handleChange} placeholder="Company Name" />
//         </div>
//         <div className="input-group">
//           <input type="number" name="age" onChange={handleChange} placeholder="Age" />
//         </div>
//         <div className="input-group">
//           <input type="date" name="dob" onChange={handleChange} placeholder="Date of Birth" />
//         </div>
//         <div className="input-group">
//           <input type="file" name="image" onChange={handleImageChange} />
//         </div>

//         {!otpSent && (
//           <button type="button" onClick={handleSendOtp} disabled={isLoading}>
//             {isLoading ? 'Sending...' : 'Send OTP'}
//           </button>
//         )}

//         {otpSent && (
//           <div>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               placeholder="Enter OTP"
//             />
//             <button type="button" onClick={handleOtpVerification} disabled={isLoading}>
//               {isLoading ? 'Verifying...' : 'Verify OTP & Register'}
//             </button>
//           </div>
//         )}

//         {error && <div className="error-message">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';


// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     company_name: '',
//     age: '',
//     dob: '',
//     image: null,
//     otp: '',
//   });
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const validateForm = () => {
//     const { email, password, name } = formData;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) return 'Invalid email';
//     if (!password || password.length < 6) return 'Password must be at least 6 characters';
//     if (!name) return 'Name is required';
//     return '';
//   };

//   const handleSendOtp = async () => {
//     const errorMsg = validateForm();
//     if (errorMsg) {
//       setError(errorMsg);
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/send-otp', {
//         email: formData.email,
//       });
//       if (response.status === 200) {
//         setOtpSent(true);
//       }
//     } catch (err) {
//       setError('Error sending OTP. Please try again.');
//       console.error('Error sending OTP:', err.response || err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpVerification = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
//         email: formData.email,
//         otp: formData.otp,
//       });

//       if (response.status === 200) {
//         handleRegister();
//       }
//     } catch (err) {
//       setError('Invalid OTP. Please check and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegister = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('password', formData.password);
//       formDataToSend.append('company_name', formData.company_name);
//       formDataToSend.append('age', formData.age);
//       formDataToSend.append('dob', formData.dob);
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       }

//       const response = await axios.post('http://localhost:5000/api/users/register', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 201) {
//         setSuccessMessage('User registered successfully');
//         alert('User registered successfully');
//       }
//     } catch (err) {
//       setError('Error registering user. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="input-group">
//           <input type="text" name="name" onChange={handleChange} placeholder="Name" />
//         </div>
//         <div className="input-group">
//           <input type="email" name="email" onChange={handleChange} placeholder="Email" />
//         </div>
//         <div className="input-group">
//           <input type="password" name="password" onChange={handleChange} placeholder="Password" />
//         </div>
//         <div className="input-group">
//           <input type="text" name="company_name" onChange={handleChange} placeholder="Company Name" />
//         </div>
//         <div className="input-group">
//           <input type="number" name="age" onChange={handleChange} placeholder="Age" />
//         </div>
//         <div className="input-group">
//           <input type="date" name="dob" onChange={handleChange} placeholder="Date of Birth" />
//         </div>
//         <div className="input-group">
//           <input type="file" name="image" onChange={handleImageChange} />
//         </div>

//         {!otpSent && (
//           <button type="button" onClick={handleSendOtp} disabled={isLoading}>
//             {isLoading ? 'Sending...' : 'Send OTP'}
//           </button>
//         )}

//         {otpSent && (
//           <div>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               placeholder="Enter OTP"
//             />
//             <button type="button" onClick={handleOtpVerification} disabled={isLoading}>
//               {isLoading ? 'Verifying...' : 'Verify OTP & Register'}
//             </button>
//           </div>
//         )}

//         {error && <div className="error-message">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Register;


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
