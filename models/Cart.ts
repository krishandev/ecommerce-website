import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
  price: Number,
  quantity: Number,

  status: {
  type: String,
  default: "Active",
},

});

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export const Cart =
  mongoose.models.Cart || mongoose.model("Cart", CartSchema);