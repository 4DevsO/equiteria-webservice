const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

exports.compressImage = async (file) => {
  try {
    console.log(file);
    await sharp(file.path).jpeg({ quality: 70 }).withMetadata().toFile(path.resolve(file.destination, 'resized', file.filename));
    fs.unlinkSync(file.path);
  } catch (e) {
    console.error(e);
  }
};
