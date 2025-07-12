
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Item } from "../models/itemModel.js";
import cloudinary from "cloudinary";
import DataUriParser from "datauri/parser.js";

import { User } from "../models/userModel.js";

export const createItem = catchAsyncError(async (req, res, next) => {
  const { title, description, category, type, size, condition, tags } = req.body;

  const images = [];

  if (req.files) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const parser = new DataUriParser();

    for (const file of req.files) {
      const fileUri = parser.format(file.originalname, file.buffer).content;
      const myCloud = await cloudinary.v2.uploader.upload(fileUri);
      images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }
  }

  const item = await Item.create({
    title,
    description,
    category,
    type,
    size,
    condition,
    tags,
    images,
    user: req.user.id,
  });

  const user = await User.findById(req.user.id);
  user.items.push(item._id);
  await user.save();

  res.status(201).json({
    success: true,
    item,
  });
});

export const getAllItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    items,
  });
});

export const getItemDetails = catchAsyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  res.status(200).json({
    success: true,
    item,
  });
});

export const updateItem = catchAsyncError(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  if (item.user.toString() !== req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to update this item", 401)
    );
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

export const deleteItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item not found", 404));
  }

  if (item.user.toString() !== req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to delete this item", 401)
    );
  }

  // Deleting images from cloudinary
  for (let i = 0; i < item.images.length; i++) {
    await cloudinary.v2.uploader.destroy(item.images[i].public_id);
  }

  await item.remove();

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
});
