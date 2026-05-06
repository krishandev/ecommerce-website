import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema(
  {
    userId: String,

    items: [OrderItemSchema],

    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },

    subtotal: Number,
    shipping: Number,
    total: Number,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);