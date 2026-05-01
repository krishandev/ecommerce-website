import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    content: {
      type: String,
    },

    image: {
      type: String,
    },

    category: {
      type: String,
    },

    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model("Blog", BlogSchema);