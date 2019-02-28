const path = require('path');
const fs = require('fs-extra');

/**
 * Creates a new file in the cache, populating with content from remote source
 *
 * @memberof cache
 * @module update
 * @param {Object} filePath Location to cache file
 * @param {Object} fileData Cache object to create
 */
module.exports = (filePath, fileData) => {
  const pathToFile = path.parse(filePath).dir;

  // Create cache directory if it doesnt exist already
  if (!fs.existsSync(pathToFile)) {
    fs.mkdirSync(pathToFile, {
      recursive: true
    });

    console.info(`Created ${pathToFile}`);
  }

  // Write data to disk
  fs.writeFile(filePath, fileData, error => {
    if (error) {
      throw error;
    }

    console.info(`Cached ${filePath}`);
  });
};
