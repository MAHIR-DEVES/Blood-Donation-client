import axios from 'axios';

export const imageUpload = async imagedata => {
  const imageFromData = new FormData();
  imageFromData.append('image', imagedata);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFromData
  );

  return data?.data?.display_url;
};

// ------------------------

// utils/imageUpload.js

// import { generateReactHelpers } from '@uploadthing/react/hooks';

// const { uploadFiles } = generateReactHelpers();

// export const imageUpload = async file => {
//   try {
//     const res = await uploadFiles('imageUploader', {
//       files: [file],
//     });

//     return res?.[0]?.url;
//   } catch (err) {
//     console.error('UploadThing error:', err);
//     return null;
//   }
// };
