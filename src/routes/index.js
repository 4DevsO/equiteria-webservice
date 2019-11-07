const express = require('express');
const route = express.Router();

const { multerImg } = require('../middlewares/multer');

const OilSpotRoute = require('../controllers/oilSpotController');
const UserRoute = require('../controllers/userController');

route.get('/', (req, res) => {
  res.json({ success: true });
});

route.get('/oilSpot', OilSpotRoute.list);
route.get('/oilSpot/:oilSpotId', OilSpotRoute.index);
route.post('/oilSpotPhoto', multerImg.array('img'), OilSpotRoute.storePhoto);
route.post('/oilSpot', OilSpotRoute.store);
route.put('/oilSpot/:oilSpotId', OilSpotRoute.update);
route.delete('/oilSpot/:oilSpotId', OilSpotRoute.delete);

route.get('/user', UserRoute.list);
route.get('/user/:userId', UserRoute.index);
route.post('/user', UserRoute.store);
route.put('/user/:userId', UserRoute.update);
route.delete('/user/:userId', UserRoute.delete);

module.exports = route;
