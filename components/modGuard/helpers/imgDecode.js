const sharp = require('sharp');
const { PNG } = require('pngjs');

//* Decoded image in UInt8 Byte array and if image in svg/gif/webp format converts it to jpg and then decodes it
const imgDecode = async (imgBuffer) => {
  try {
    const buffer = await sharp(imgBuffer).png().toBuffer();
    return PNG.sync.read(buffer);
  } catch (err) {
    console.log('error in imgDecode');
    console.log(err);
  }
};

module.exports = imgDecode;
