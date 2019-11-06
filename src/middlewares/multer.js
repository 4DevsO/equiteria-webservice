const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const fileDestination = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const multerConfig = {
  dest: fileDestination,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fileDestination);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err);
        } else {
          const fileName = `${hash.toString('hex')}.${file.mimetype.split('/')[1]}`;
          cb(null, fileName);
        }
      });
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype !== ' image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  }
};

const multerImg = multer(multerConfig);

module.exports = { multerImg };
