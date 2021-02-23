const Exercises = require('../models/exercises');
// const exercises = require('../db/exercises.json');


const getAllExercises = async (req, res) => {
  Exercises.find((err, exercises) => {
    if (err) return console.error(err);
    const sortedExercises = exercises.sort((a, b) => a.title.localeCompare(b.title));
    res.json(sortedExercises);
  })
}

const getExerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercises.findOne({ _id: `${id}` });
    res.status(200).send(exercise);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
}

const getExerciseByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const categories = await Exercises.find({ category: `${category}` })
    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title));

    res.status(200).send(sortedCategories);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
}


// POST EXERCISES TO MONGODB ATLAS
// const addExercises = async (req, res) => {
//   try {
//     Exercises.insertMany(exercises)
//     res.status(200).send({ message: 'Posted to the database successfully' });
//   } catch (err) {
//     console.error(err);
//   }
// }


module.exports = {
  getAllExercises,
  getExerciseById,
  getExerciseByCategory,
}