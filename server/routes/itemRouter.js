
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createItem, getAllItems, getItemDetails, updateItem, deleteItem } from "../controllers/itemController.js";

const router = express.Router();

router.route("/item/new").post(isAuthenticated, createItem);
router.route("/items").get(getAllItems);
router.route("/item/:id").get(getItemDetails).put(isAuthenticated, updateItem).delete(isAuthenticated, deleteItem);

export default router;
