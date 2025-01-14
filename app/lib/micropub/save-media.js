const path = require('path');

const config = require(process.env.PWD + '/app/config');
const logger = require(process.env.PWD + '/app/logger');
const record = require(process.env.PWD + '/app/lib/record');
const render = require(process.env.PWD + '/app/lib/render');
const store = require(process.env.PWD + '/app/lib/store');
const utils = require(process.env.PWD + '/app/lib/utils');

/**
 * Saves a media file
 *
 * @memberof micropub
 * @module saveMedia
 * @param {Object} pub Publication configuration
 * @param {Object} file File object
 * @returns {String} Location of created file
 */
module.exports = async (pub, file) => {
  logger.info('micropub.saveMedia', {file});

  // Determine post type from media type
  const type = utils.deriveMediaType(file);
  const typeConfig = pub['post-types'][type];

  // Provide additional properties for file path templates
  const fileProperties = utils.deriveFileProperties(file);

  // Render destination path
  const mediaPath = render(typeConfig.media.path, fileProperties);
  const mediaUrl = render(typeConfig.media.url || typeConfig.media.path, fileProperties);
  const mediaName = path.basename(mediaPath);

  // Prepare location and activity record
  const url = new URL(mediaUrl, config.url);
  const location = url.href;
  const recordData = {
    media: {
      path: mediaPath,
      url: mediaUrl
    }
  };

  // Upload file to GitHub
  try {
    const response = await store.github.createFile(mediaPath, file.buffer, {
      message: `:framed_picture: Uploaded ${mediaName}`
    });

    if (response) {
      record.create(location, recordData);
      logger.info('micropub.saveMedia', {recordData});
      return location;
    }
  } catch (error) {
    logger.error('micropub.saveMedia', {error});
    throw new Error(error);
  }
};
