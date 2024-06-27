import path from "path";
const ALLOWED_EXT = [".mp3", ".wav", ".flac"];
const ALLOWED_MIME_TYPES = ["audio/mpeg", "audio/wav", "audio/flac"];
export const validateAudioFileType = (file: Express.Multer.File) =>
  ALLOWED_MIME_TYPES.includes(file.mimetype) &&
  ALLOWED_EXT.includes(path.extname(file.originalname).toLowerCase());

