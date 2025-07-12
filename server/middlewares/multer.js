import multer from "multer";

// store files in memory (for Cloudinary upload)
const storage = multer.memoryStorage();

export const upload = multer({ storage });
