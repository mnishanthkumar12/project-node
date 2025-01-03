const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const multer = require('multer');
const Joi = require('joi');

const { createUser, findUserByEmail, deleteUserByEmail } = require('../models/user');

// Set up image upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Image will be saved to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // File name with timestamp
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isValid = allowedTypes.test(file.mimetype);
        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png) are allowed'));
        }
    },
});

// Send OTP Email
const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`,
    };

    return transporter.sendMail(mailOptions);
};

// Temporary OTP storage (to be replaced with database or Redis for production)
const otpStore = {};

// Send OTP Route
// Send OTP Route
router.post('/send-otp', async (req, res) => {
    console.log('Request Body:', req.body);  // Log the full body to ensure email is being received
    
    const { email } = req.body;
  
    if (!email) {
      console.error('Error: Email not provided in request body');
      return res.status(400).send('Email is required');
    }
  
    // const user = await findUserByEmail(email);
    // console.log('User lookup result:', user); // Log the result of the query
    // if (!user) {
    //   console.error(`Error: User not found for email: ${email}`);
    //   return res.status(400).send('User not found');
    // }
  
    const otp = otpGenerator.generate(6, { digits: true, specialChars: false, alphabets: false });
    const expiryTime = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  
    otpStore[email] = { otp, expiryTime };
  
    try {
      await sendOtpEmail(email, otp);
      console.log(`OTP sent to: ${email}`); // Log success for debugging
      res.status(200).send('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error); // Detailed logging of the error
      res.status(500).send('Failed to send OTP');
    }
  });
  

// Register New User Route
router.post('/register', upload.single('image'), async (req, res) => {
    const { name, email, password, company_name, age, dob } = req.body;
    const image = req.file ? req.file.path : null;
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      company_name,
      age,
      dob,
      image,
    };
  
    try {
      await createUser(newUser);  // Call to insert into DB
      res.status(201).send('User registered successfully');
    } catch (err) {
      console.error('Error in user registration:', err);
      res.status(500).send('Error registering user');
    }
  });
  
 // userRoutes.js

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user by email from DB
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
});



// Verify OTP Route
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    const storedOtpData = otpStore[email];

    if (!storedOtpData) {
        return res.status(400).send('OTP not found or expired');
    }

    if (Date.now() > storedOtpData.expiryTime) {
        delete otpStore[email];
        return res.status(400).send('OTP has expired');
    }

    if (otp === storedOtpData.otp) {
        delete otpStore[email];
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
});
const otpStorage = {};  // Ensure this is defined

// Delete Account Route
router.delete('/delete-account', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP is provided
    if (!otp) {
      return res.status(400).json({ message: 'OTP is required to delete account' });
    }

    // Ensure OTP exists for the given email and check if it's valid
    if (!otpStorage[email]) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    const storedOtp = otpStorage[email].otp;
    const otpTimestamp = otpStorage[email].timestamp;

    // Check if OTP is expired (valid for 5 minutes)
    if (Date.now() - otpTimestamp > 5 * 60 * 1000) {
      delete otpStorage[email];  // Clear the expired OTP
      return res.status(400).json({ message: 'OTP expired, please request a new one' });
    }

    // Validate OTP
    if (otp !== storedOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Proceed to delete the user account from the database
    const query = 'DELETE FROM users WHERE email = ?';
    const [result] = await db.promise().execute(query, [email]);

    // Check if the user was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove OTP from storage after use
    delete otpStorage[email];

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Error deleting account' });
  }
});
  
module.exports = router;


