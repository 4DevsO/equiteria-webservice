const PinModel = require('../models/Pin');

module.exports = {
  list: async (req, res) => {
    const pins = await PinModel.find({});

    res.json({ success: true, data: pins });
  },

  index: async (req, res) => {
    const { pinId } = req.params;

    const pin = await PinModel.findById(pinId);

    res.json({ success: true, data: pin });
  },

  store: async (req, res) => {
    const {
      colect_date,
      location: { latitude, longitude }
    } = req.body;

    const pinLocation = { type: 'Point', coordinates: [longitude, latitude] };
    const createdPin = await PinModel.create({
      colect_date,
      location: pinLocation
    });

    res.json({ success: true, data: createdPin });
  },

  update: async (req, res) => {
    const { active } = req.body;
    const { pinId } = req.params;

    const updatedPin = await PinModel.findByIdAndUpdate(
      pinId,
      { active },
      { new: true }
    );

    res.json({ success: true, data: updatedPin });
  },

  delete: async (req, res) => {
    const { pinId } = req.params;

    await PinModel.findByIdAndDelete(pinId);

    res.json({ success: true });
  }
};
