const Exercise = require('../models/Exercise');

// Create a new exercise
const createExercise = async (username, description, duration, date) => {
    try {    
        const newExerciseData = { username, description, duration };
        if (date) {
            newExerciseData.date = date;
        }
        const newExercise = Exercise(newExerciseData);
        const savedExercise = await newExercise.save();
        return savedExercise;
    } catch (err) {
        console.error('Error creating exercise:', err);
        throw err;
    }
};

// Get an exercise by ID
const getExerciseById = async (id) => {
    try {
        const exercise = await Exercise.findById(id);
        return exercise;
    } catch (err) {
        console.error('Error finding exercise by ID:', err);
        throw err;
    }
};

// Get all exercises
const getAllExercises = async () => {
    try {
        const exercises = await Exercise.find({});
        return exercises;
    } catch (err) {
        console.error('Error finding all exercises:', err);
        throw err;
    }
};

// Update an exercise by ID
const updateExerciseById = async (id, updateData) => {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(id, updateData, { new: true });
        return updatedExercise;
    } catch (err) {
        console.error('Error updating exercise by ID:', err);
        throw err;
    }
};

// Delete an exercise by ID
const deleteExerciseById = async (id) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(id);
        return deletedExercise;
    } catch (err) {
        console.error('Error deleting exercise by ID:', err);
        throw err;
    }
};

const getExercisesByUsername = async (username) => {
    return await Exercise.find({ username });
};

const getExercisesByQuery = async (query) => {
    return await Exercise.find(query).sort({ date: 1 });
  };

module.exports = {
    createExercise,
    getExerciseById,
    getAllExercises,
    updateExerciseById,
    deleteExerciseById,
    getExercisesByUsername,
    getExercisesByQuery
};
