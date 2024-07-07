const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:5173','http://localhost:3000', 'http://oceanofmovies.com','https://oceanofmovies.com','https://d3chmvu8w1j04a.cloudfront.net' ];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Why bro why u are tryping to get my data 😤 '));
    }
  },
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Define Routes
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
