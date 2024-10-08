const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, enum: ['movie', 'series','anime','18','kdrama','netflix','amazon','bollywood'], required: true },
  imdbRating: { type: String, min: 0, max: 10 },
  directors: { type: [String], required: true },
  stars: { type: [String], required: true },
  languages: { type: [String], required: true },
  screenshots: { type: [String], default: [] },
  genres: { type: [String], required: true },
  allInOne: {
    '480p': { url: String, size: String },
    '720p': { url: String, size: String },
    '720p 10 Bit': { url: String, size: String },
    '1080p': { url: String, size: String },
    '1080p 10 Bit': { url: String, size: String }
  },
  episodes: [{
    title: { type: String },
    qualities: {
      '480p': { type: String },
      '720p': { type: String },
      '1080p': { type: String }
    }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to set the updatedAt field before each save
movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to set the updatedAt field before each update
movieSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
