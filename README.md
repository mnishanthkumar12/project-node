Project Description:
This project implements a user management system that includes user registration, login with OTP verification, and account management functionalities. The application enables:

User Login & Registration: Users can create new accounts and log in using their credentials.
OTP Verification: After login, a 6-digit OTP is generated for added security.
Account Management: Users can delete their accounts if necessary.
Image Upload: Users can upload a profile image during registration.
Features:
User Login: Capture email and password, validate credentials against the database.
OTP Generation: After login, generate a time-limited OTP (valid for 10 minutes) for additional security.
OTP Verification: After user enters OTP, verify its validity.
User Registration: New users can register by providing name, email, password, company name, age, date of birth (DOB), and a profile image (PNG/JPG).
Account Deletion: A "Remove Account" feature allows users to delete their accounts.
Form Validation: Ensures proper input validation (email format, password rules, image format).
Technologies Used:
Frontend: React.js / Next.js
Backend: Node.js / Express.js
Database: MongoDB (or any other database you used)
Authentication: JWT (JSON Web Tokens) for secure login
OTP Generation: Custom OTP logic using crypto or an npm package
Image Upload: Use multer or a similar package for handling file uploads
Installation:
Clone the repository:

git clone https://github.com/mnishanthkumar12/project-node.git
cd project-node
Install backend dependencies:

cd server
npm install
Install frontend dependencies (if applicable):

cd client
npm install
Set up environment variables: Create a .env file in the root directory and add the following:

DATABASE_URI=<your-database-uri>
JWT_SECRET=<your-jwt-secret-key>
OTP_EXPIRATION_TIME=10  # OTP expiration time in minutes
Start the backend server:

cd server
npm start
Start the frontend server (if applicable):

bash
Copy code
cd client
npm start
API Endpoints:
POST /api/login: Logs in the user and generates OTP.
Request Body: email, password
POST /api/register: Registers a new user.
Request Body: name, email, password, company_name, age, dob, image
POST /api/verify-otp: Verifies the OTP sent to the user's email.
Request Body: email, otp
DELETE /api/delete-account: Deletes the user account from the database.
Request Body: email
Usage:
For User Registration:
Navigate to the Register page.
Fill out the form with required details:
Name
Email (must be valid)
Password (case-sensitive)
Company Name
Age
Date of Birth
Profile Image (PNG or JPG)
Upon successful registration, the user will be directed to the login page.
For User Login:
Enter the email and password.
After successful login, an OTP will be sent to the provided email.
Enter the OTP in the input field to verify and log in.
After successful OTP verification, the user will be redirected to a Thank You page where their account details are displayed.
For Account Deletion:
From the Thank You page, click the Remove Account button to delete your account from the system.
Environment Variables:
Here are the environment variables you need to set up in your .env file:

DATABASE_URI: URI of your database.
JWT_SECRET: Secret key used for JWT authentication.
OTP_EXPIRATION_TIME: The time in minutes for the OTP to expire (default is 10 minutes).


JWT_SECRET=mySecretKey123
OTP_EXPIRATION_TIME=10
