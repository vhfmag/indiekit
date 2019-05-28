/**
 * Interfaces to remote locations where files and configuration are stored.
 *
 * @module store
 */
module.exports = {
  cloudinary: require(process.env.PWD + '/app/lib/store/cloudinary'),
  github: require(process.env.PWD + '/app/lib/store/github')
};
