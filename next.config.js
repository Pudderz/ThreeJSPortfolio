const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
        // Or use this to support MD files too
        // extension: /\.(md|mdx)$/,
})
module.exports = withImages(),withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
  }),{
    // Target must be serverless
    target: "serverless",
  };
  
 