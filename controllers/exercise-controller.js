const mongoose = require('mongoose');
const fs = require('fs');
const Exercises = require('../models/exercises');
const exercises = require('../db/exercises.json');
// const exercises = JSON.parse(fs.readFileSync('/Users/helari/Desktop/scraper/db/exercises.json', 'utf-8'))




const getAllExercises = async (req, res) => {
  const sortedExercises = exercises.sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).send(sortedExercises)
}

const getExerciseById = async (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find(e => id === e.id);
  res.status(200).send(exercise);
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
}