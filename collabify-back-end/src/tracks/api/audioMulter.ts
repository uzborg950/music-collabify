import multer from "multer";
import path from "path";
import { validateAudioFileType } from "./utils";

const formatDate = (date: Date) => {
  const pad = (number: number) => number.toString().padStart(2, "0");

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1); // Months are zero-indexed
  const year = date.getUTCFullYear();
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
};

const storage = multer.diskStorage({
  destination: process.env.LOCAL_TRACK_UPLOAD_PATH,
  filename: (req, file, cb) => {
    const dateSuffix = formatDate(new Date());
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        dateSuffix +
        path.extname(file.originalname),
    );
  },
});
export const audioMulter = multer({
  storage: storage,
  fileFilter: (req, file, cb) =>
    validateAudioFileType(file)
      ? cb(null, true)
      : cb(
          Error(
            `Error: Invalid file type uploaded: ${file.originalname} ${file.mimetype}`,
          ),
        ),
});
