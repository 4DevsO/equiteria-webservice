const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

const { signInUser, updateUser } = require('../services/userServices');

module.exports = {
  list: async (req, res) => {
    const users = await UserModel.find({});

    return res.json({ success: true, data: users });
  },

  index: async (req, res) => {
    const { userId } = req.params;

    const spot = await UserModel.findOne({ user_id: userId });

    return res.json({ success: true, data: spot });
  },

  store: async (req, res) => {
    const user = { ...req.body };

    try {
      const newUser = await signInUser(user);
      return res.status(200).json({ success: true, data: newUser });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ success: false, message: e.message });
    }
  },

  update: async (req, res) => {
    const user = { ...req.body };
    const { userId } = req.params;

    try {
      const updatedUser = await updateUser(userId, user);
      return res.status(200).json({ success: true, data: updatedUser });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ success: false, message: e.message });
    }
  },

  delete: async (req, res) => {
    const { spotId } = req.params;

    await UserModel.findOneAndRemove({ spot_id: spotId });

    return res.json({ success: true });
  }
}
;
