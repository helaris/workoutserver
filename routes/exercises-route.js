const express = require('express');
const { getAllExercises, getExerciseById, getByCategory } = require('../controllers/exercise-controller');
const router = express.Router();

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);

module.exports = router;