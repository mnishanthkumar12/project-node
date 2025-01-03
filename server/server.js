// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const userRoutes = require('./routes/userRoutes'); // Ensure the path is correct

// const app = express();

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);

// // Logging for debugging
// console.log('User Routes:', userRoutes);

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes'); // Ensure the path is correct

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Logging for debugging
console.log('User Routes:', userRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
