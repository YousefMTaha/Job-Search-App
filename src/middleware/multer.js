import multer from "multer";

export let validExtention = {
  image: ["image/png", "image/jpeg"],
  audio: ["audio/x-ms-wma", "audio/mp4"],
  pdf: ["application/pdf"],
  video: ["video/mp4"],
};

export const multerCloudinary = (customValidation) => {
  if (!customValidation) {
    customValidation = validExtention.image;
  }

  const storage = multer.diskStorage({});
  const fileFilter = function (req, file, cb) {
    console.log(file.mimetype);
    if (customValidation.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error("invalid type"), false);
  };

  const upload = multer({ fileFilter, storage });
  return upload;
};
