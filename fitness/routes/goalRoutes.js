const express = require('express');
const router = express.Router();
const {
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', setGoal);
router.get('/', getGoals);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;