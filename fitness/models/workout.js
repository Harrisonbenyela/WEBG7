const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },             // e.g., cardio, strength
  duration: { type: Number, required: true },         // in minutes
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);