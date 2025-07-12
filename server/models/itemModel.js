
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title for the item."],
  },
  description: {
    type: String,
    required: [true, "Please enter a description for the item."],
  },
  category: {
    type: String,
    required: [true, "Please select a category for the item."],
  },
  type: {
    type: String,
  },
  size: {
    type: String,
  },
  condition: {
    type: String,
    required: [true, "Please specify the condition of the item."],
  },
  tags: {
    type: [String],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Item = mongoose.model("Item", itemSchema);
