const express = require('express');
const router = express.Router();
const {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);  // protect all routes

router.post('/', addWorkout);
router.get('/', getWorkouts);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;