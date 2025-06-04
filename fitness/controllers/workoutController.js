const Workout = require('../models/workout');

// Add a workout
const addWorkout = async (req, res) => {
  const { type, duration, caloriesBurned, date } = req.body;
  try {
    const workout = await Workout.create({
      userId: req.userId,
      type,
      duration,
      caloriesBurned,
      date: date || new Date()
    });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all workouts for current user
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a workout
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addWorkout, getWorkouts, updateWorkout, deleteWorkout };