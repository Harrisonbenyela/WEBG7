const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const goalRoutes = require('./routes/goalRoutes');

app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => {
  res.send('Fitness Tracker API is running');
});

module.exports = app;