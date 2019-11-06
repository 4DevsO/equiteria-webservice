const mongoose = require('mongoose');
const { ValidationException } = require('../handlers/exceptionHandlers');

const User = mongoose.model('User');

module.exports = {

  signInUser: async user => {
    const { email, user_id, name } = user;
    // Check if user already exists
    const emailExist = await User.findOne({ email, user_id });
    if (emailExist) {
      throw new ValidationException('User already registered');
    }

    // Create a new user
    const newUser = new User({
      user_id,
      email,
      name
    });

    try {
    // Save new user to mongo
      await newUser.save();
      return true;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  updateUser: async (user_id, user) => {
    const userFound = User.findOne({ user_id });
    if (!userFound) {
      throw new ValidationException('User not found');
    }

    const updatedUser = Object.assign(user, userFound);

    try {
    // Save new user to mongo
      await updatedUser.save();
      return true;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }
};
