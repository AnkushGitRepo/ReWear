import express from "express";
import { createItem } from "../controllers/itemController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/item/new",
  isAuthenticated,
  upload.array("files"), // <-- this is important
  createItem
);

export default router;
