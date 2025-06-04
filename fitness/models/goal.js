const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, required: true },      // e.g., "weight loss", "muscle gain"
  targetValue: { type: Number, required: true },     // e.g., 5 (kg), 10 (sessions)
  progressValue: { type: Number, default: 0 },
  deadline: { type: Date, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);