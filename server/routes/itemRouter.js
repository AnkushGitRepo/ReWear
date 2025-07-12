import express from "express";
import { createItem, getItemById } from "../controllers/itemController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// This becomes /api/v1/item/new
router.post("/new", isAuthenticated, upload.array("files"), createItem);

// This becomes /api/v1/item/:id
router.get("/:id", getItemById);

export default router;
