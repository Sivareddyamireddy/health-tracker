const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Fixes deprecation warnings and improves connection handling
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Import Routes
const exercisesRouter = require('./routes/exercise'); // Ensure file is named `exercises.js`
const usersRouter = require('./routes/users');

// Use Routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
