/**
 * Get, create and delete data at a specified path at configured GitHub repo.
 *
 * @module store/cloudinary
 */
const config = require(process.env.PWD + '/app/config');

const cloudinary = require('cloudinary').v2;

/**
 * Creates a new file in a Cloudinary account
 * @see {@link https://cloudinary.com/documentation/node_image_and_video_upload Cloudinary Node.js SDK: Image and video upload}
 *
 * @memberof store/github
 * @exports createFile
 * @param {String} content File content
 * @param {String} options Options
 * @return {Promise} Cloudinary image URL
 */
const createFile = async (content, options) => {
  try {
    return await cloudinary.uploader.upload(content, {
      tags: options.tags
    }, (error, image) => {
      console.log('Uploading image to Cloudinary');

      if (error) {
        console.warn(error);
      }

      console.log('Cloudinary image URL', image.url);

      // TODO: Get URL of uploaded media and save it to content file
      // Not sure where to perform that function yet.
      return image.url;
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createFile
};
