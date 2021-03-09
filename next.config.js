const withSass = require('@zeit/next-sass')
const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
module.exports = withPlugins([
  // [withOptimizedImages, {
  //   optimizeImages: true,
  //   removeOriginalExtension: true,
  //   optimizeImagesInDev: true,
  //   responsive: {
  //     //  adapter: require('responsive-loader/sharp')
  //     // sizes: [320, 640, 960, 1200],
  //             placeholder: true,
  //             placeholderSize: 20,
  //   }
    
  // }],
],
{
    // Target must be serverless
    target: "serverless",
    images: {
        domains: ['images.ctfassets.net'],
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.(jpe?g|png|webp)$/i,
    //       use: {
    //         loader: 'responsive-loader',
    //         options: {
    //           // If you want to enable sharp support:
    //            adapter: require('responsive-loader/sharp'),
    //         }
    //       }
    //     }
    //   ]
    // },
   
  });
  
  // // module.exports = withOptimizedImages({
  //   /* config for next-optimized-images */
  //   optimizeImagesInDev: true,

  //   // your config for other plugins or the general next.js here...
  // });