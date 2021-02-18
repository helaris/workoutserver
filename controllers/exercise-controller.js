const exercises = require('../db/exercises.json');

const getAllExercises = async (req, res) => {
  res.status(200).send(exercises)
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