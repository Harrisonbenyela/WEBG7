const Goal = require('../models/Goal');

// Set a new goal
const setGoal = async (req, res) => {
  const { targetType, targetValue, progressValue, deadline } = req.body;
  try {
    const goal = await Goal.create({
      userId: req.userId,
      targetType,
      targetValue,
      progressValue: progressValue || 0,
      deadline
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all goals for user
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a goal
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { setGoal, getGoals, updateGoal, deleteGoal };