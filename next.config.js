const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
],
{
    // Target must be serverless
    target: "serverless",
    images: {
        domains: ['images.ctfassets.net'],
    },
   
  });
  
