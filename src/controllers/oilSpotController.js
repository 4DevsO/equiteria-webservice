const mongoose = require('mongoose');
const OilSpotModel = mongoose.model('OilSpot');

module.exports = {
  list: async (req, res) => {
    const spots = await OilSpotModel.find({});

    res.json({ success: true, data: spots });
  },

  index: async (req, res) => {
    const { spotId } = req.params;

    const spot = await OilSpotModel.findById(spotId);

    res.json({ success: true, data: spot });
  },

  store: async (req, res) => {
    const {
      __id,
      collect_date,
      location: { latitude, longitude },
      photos
    } = req.body;

    const spotLocation = { type: 'Point', coordinates: [longitude, latitude] };

    try {
      const createdSpot = await OilSpotModel.create({
        __id,
        collect_date,
        location: spotLocation,
        photos
      });
      console.log(createdSpot);
      res.json({ success: true, data: createdSpot });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
      console.error(e.message);
    }
  },

  update: async (req, res) => {
    const { active } = req.body;
    const { spotId } = req.params;

    const updatedSpot = await OilSpotModel.findByIdAndUpdate(
      spotId,
      { active },
      { new: true }
    );

    res.json({ success: true, data: updatedSpot });
  },

  delete: async (req, res) => {
    const { spotId } = req.params;

    await OilSpotModel.findByIdAndDelete(spotId);

    res.json({ success: true });
  }
};
