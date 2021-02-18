const exercises = require('../db/exercises.json');

const getAllExercises = async (req, res) => {
  const sortedExercises = exercises.sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).send(sortedExercises)
}

const getExerciseById = async (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find(e => id === e.id);
  res.status(200).send(exercise);
}

module.exports = {
  getAllExercises,
  getExerciseById,
}