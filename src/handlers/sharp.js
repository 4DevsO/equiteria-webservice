const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

exports.compressImage = async (imagesData) => {
  const imagesName = [];

  try {
    for (const [, image] of Object.entries(imagesData)) {
      await sharp(image.path).resize(25).jpeg({ quality: 70 }).withMetadata().toFile(path.resolve(image.destination, 'resized', image.filename));
      fs.unlinkSync(image.path);
      imagesName.push(image.filename);
    };
    return imagesName;
  } catch (e) {
    console.error(e);
  }
};
