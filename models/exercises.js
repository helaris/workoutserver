const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  title: {
    type: String
  },
  id: {
    type: String,
  },
  description: Schema.Types.Mixed,
  bodyPart: {
    type: String
  },
  category: {
    type: [String]
  },
  equipment: {
    type: String
  },
  images: {
    type: [String]
  }
})

const exercises = mongoose.model("Exercises", exerciseSchema);
module.exports = exercises;