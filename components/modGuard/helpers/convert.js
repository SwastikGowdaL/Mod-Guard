const tf = require('@tensorflow/tfjs-node');
const imgDecode = require('./imgDecode');

//* converting the image to the format that can be understood by the nsfw library
const convert = async (imgBuffer) => {
  const image = await imgDecode(imgBuffer);
  const numChannels = 3;
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++)
    for (let c = 0; c < numChannels; ++c)
      values[i * numChannels + c] = image.data[i * 4 + c];

  return tf.tensor3d(values, [image.height, image.width, numChannels], 'int32');
};

module.exports = convert;
