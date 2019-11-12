const mongoose = require('mongoose');
const { ValidationException } = require('../handlers/exceptionHandlers');

const User = mongoose.model('User');

module.exports = {

  signInUser: async user => {
    const { email, phone_number, name } = user;
    // Check if user already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new ValidationException('User already registered');
    }

    try {
    // Save new user to mongo
      const newUser = await User.create({
        phone_number,
        email,
        name
      });
      return newUser;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  updateUser: async (userId, user) => {
    const { _id } = user;
    if (_id && _id !== userId) {
      throw new Error(`You can't change the id`);
    }

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: userId }, user, { new: true });
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
