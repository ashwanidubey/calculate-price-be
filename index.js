const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const price=require('./routes/price')
const connectToMongo = require('./db.js');


app.use(cors())
// Middleware for parsing JSON
app.use(express.json());

// Connect to the database
connectToMongo();

// Routes
app.use('/auth', authRoutes);
app.use('/price', price);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});