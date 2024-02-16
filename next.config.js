const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({ mode: 'static' })({
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/overview',
        permanent: false
      }
    ];
  },
  rewrites() {
    return [
      {
        source: '/spec',
        destination: '/spec.html'
      }
    ];
  }
});

const nextConfig = {
  /* config options here */
  output: 'export',
}
 
module.exports = nextConfig