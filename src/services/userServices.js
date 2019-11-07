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

  updateUser: async (userId, user) => {
    const { user_id } = user;
    console.log(user_id);
    if (user_id && user_id !== userId) {
      throw new Error(`You can't change the id`);
    }

    try {
      const updatedUser = await User.findOneAndUpdate({ user_id: userId }, user, { new: true });
      if (!updatedUser) {
        throw new Error(`User not found`);
      }
      return updatedUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};
