import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    category: { type: String, required: true },
    rating: { type: Number, default: 4 },
    description: String,
    stock: { type: Boolean, default: true },
    image: String,
    images: [String],
  },
  { timestamps: true }
);

export const Product =
  models.Product || mongoose.model("Product", ProductSchema);