import fetch from "isomorphic-unfetch";

// import sizeOf from "image-size";
import fs from "fs";

const storeImage = (slug, resp) =>
  new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(`${process.cwd()}/public/images/${slug}.png`);
    if (!resp || !resp.body) {
      reject("no body on fetch response");
    } else {
      resp.body.pipe(fileStream);
      fileStream.on("finish", () => {
        resolve();
      });
      fileStream.on("error", err => {
        reject(err);
      });
    }
  });



// const compressImage = slug => {
//   new Promise((resolve, reject) => {
//     sharp(`${process.cwd()}/public/images/${slug}.png`)
//       .resize({ height:323, width:640})
//       .toFile(
//       `${process.cwd()}/public/images/compressed-${slug}.png`,
//       (error, info) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(info);
//           console.log(`Processed and compressed - ${slug}, ${info}`)
//         }
//       }
//     );
//   });
// }

 export const createImage = async (slug, url) => {
  const resp = await fetch(
    url
  );

  await storeImage(slug, resp);
  // await convertImageToWebP(slug);
  // await compressImage(slug)

  return {
    // svg,
    webp: slug,
    // dimensions
  };
};

export default createImage;
