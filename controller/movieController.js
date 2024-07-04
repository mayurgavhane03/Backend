// controllers/movieController.js
const CryptoJS = require('crypto-js');
const Movie = require('../Models/Movie');

const secretKey = 'MNMN0808';

// Decrypt function
function decryptData(encryptedData, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Encrypt function
function encryptData(data, secretKey) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movies by type
const getMoviesByType = async (req, res) => {
  try {
    const movies = await Movie.find({ type: req.params.type });
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movies by rating
const getMoviesByRating = async (req, res) => {
  try {
    const movies = await Movie.find({ imdbRating: { $gte: Number(req.params.rating) } });
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movies by title
const getMoviesByTitle = async (req, res) => {
  try {
    const movies = await Movie.find({ title: { $regex: req.params.title, $options: 'i' } });
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movies by language
const getMoviesByLanguage = async (req, res) => {
  try {
    const movies = await Movie.find({ languages: req.params.language });
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movies by quality
const getMoviesByQuality = async (req, res) => {
  try {
    const qualityField = `allInOne.${req.params.quality}`;
    const movies = await Movie.find({ [qualityField]: { $exists: true } });
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
  try {
    const movies = await Movie.find({ genres: req.params.genre });
    const encryptedResponse = encryptData(movies, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const encryptedResponse = encryptData(movie, secretKey);
    res.json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a movie
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMoviesByType,
  getMoviesByRating,
  getMoviesByTitle,
  getMoviesByLanguage,
  getMoviesByQuality,
  getMoviesByGenre,
  getMovieById,
  updateMovie,
  deleteMovie
};
