/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://docs.helix.ml',
  generateRobotsTxt: true,
  async additionalPaths(config) {
    return [await config.transform(config, '/spec')];
  }
};
