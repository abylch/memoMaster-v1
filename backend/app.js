const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/dbConnection');
const noteRoutes = require('./routes/Note');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Use CORS middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Define notes routes
app.use('/api', noteRoutes);

// Define authentication routes
app.use('/api/auth', authRoutes);

// Define user routes
app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
