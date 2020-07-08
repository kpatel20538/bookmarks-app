const imagemin = require("imagemin");
const pngquant = require("imagemin-pngquant");

const compress = async (uncompressed) =>
  imagemin.buffer(uncompressed, {
    plugins: [pngquant({ quality: [0.6, 0.8] })],
  });

module.exports = compress;
