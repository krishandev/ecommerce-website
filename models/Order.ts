import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const OrderItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const OrderSchema = new Schema(
  {
    // ✅ Clerk User ID
    userId: {
      type: String,
      required: true,
    },

    // ✅ Products
    items: [OrderItemSchema],

    // ✅ Shipping Details
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      zipCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    // ✅ Pricing
    subtotal: {
      type: Number,
      required: true,
    },

    shipping: {
      type: Number,
      required: true,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    // ✅ Order Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ✅ Payment
    paymentMethod: {
      type: String,
      default: "COD",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    // ✅ Delivery
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

const Order =
  models.Order || model("Order", OrderSchema);

export default Order;


// import mongoose, { Schema, models, model } from "mongoose";

// const OrderItemSchema = new mongoose.Schema({
//   name: String,
//   slug: String,
//   image: String,
//   price: Number,
//   quantity: Number,
// });

// const OrderSchema = new mongoose.Schema(
//   {
//     userId: String,

//     items: [OrderItemSchema],

//     shippingAddress: {
//       fullName: String,
//       email: String,
//       phone: String,
//       address: String,
//       city: String,
//       state: String,
//       zipCode: String,
//       country: String,
//     },

//     subtotal: Number,
//     shipping: Number,
//     total: Number,

//     status: {
//       type: String,
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// export const Order =
//   mongoose.models.Order || mongoose.model("Order", OrderSchema);