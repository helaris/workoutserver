const express = require('express');
const { getAllExercises, getExerciseById, getExerciseByCategory } = require('../controllers/exercise-controller');
const router = express.Router();

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.get('/category/:category', getExerciseByCategory);

// Posted exercises to ATLAS
// router.post('/', addExercises);

module.exports = router;