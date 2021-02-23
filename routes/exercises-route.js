const express = require('express');
const { getAllExercises, getExerciseById } = require('../controllers/exercise-controller');
const router = express.Router();

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);

// Posted exercises to ATLAS
// router.post('/', addExercises);

module.exports = router;