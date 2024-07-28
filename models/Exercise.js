const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    description:  { type: String},
    duration: {type:Number, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
