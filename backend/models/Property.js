import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
    trim: true,
  },
  price: {
    type: String,
    required: [true, "Please add a price"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  space: {
    type: String,
    required: [true, "Please add space details"],
  },
  bathCount: {
    type: String,
    required: [true, "Please add bathroom count"],
  },
  forSale: {
    type: Boolean,
    default: true,
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Property", PropertySchema);
