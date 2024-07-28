const User = require('../models/User');

// Create a new user
const createUser = async (username) => {
    try {
        const newUser = new User({ username });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

// Get a user by ID
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.error('Error finding user by ID:', err);
        throw err;
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (err) {
        console.error('Error finding all users:', err);
        throw err;
    }
};

// Update a user by ID
const updateUserById = async (id, newUsername) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username: newUsername }, { new: true });
        return updatedUser;
    } catch (err) {
        console.error('Error updating user by ID:', err);
        throw err;
    }
};

// Delete a user by ID
const deleteUserById = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (err) {
        console.error('Error deleting user by ID:', err);
        throw err;
    }
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById
};
