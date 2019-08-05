const config = require(process.env.PWD + '/app/config');
const logger = require(process.env.PWD + '/app/logger');
const utils = require(process.env.PWD + '/app/lib/utils');

const Octokit = require('@octokit/rest');

const octokit = new Octokit({
  auth: `token ${config.github.token}`
});

/**
 * Reads content of a file or directory in a repository
 * @see {@link https://developer.github.com/v3/repos/contents/#get-contents GitHub REST API v3: Get Contents}
 *
 * @memberof github
 * @exports getContents
 * @param {String} path Path to file
 * @return {Promise} GitHub HTTP response
 */
module.exports = async path => {
  path = utils.normalizePath(path);

  try {
    const getResponse = await octokit.repos.getContents({
      owner: config.github.user,
      repo: config.github.repo,
      ref: config.github.branch,
      path
    });
    getResponse.data.content = Buffer.from(getResponse.data.content, 'base64').toString('utf8');
    return getResponse;
  } catch (error) {
    logger.error('github.getContents', {error});
    throw new Error(error.message);
  }
};