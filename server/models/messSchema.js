import mongoose from "mongoose";

// Schema for each meal type (breakfast, lunch, etc.)
const mealSchema = new mongoose.Schema(
  {
    items: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String },
    country: { type: String, default: "India" },
  },
  { _id: false }
);

// Schema for one day's meals
const dailyMenuSchema = new mongoose.Schema(
  {
    breakfast: mealSchema,
    lunch: mealSchema,
    snacks: mealSchema,
    dinner: mealSchema,
  },
  { _id: false }
);

// Final Mess Schema
const messSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,

      required: true,
      match: [/^[0-9+()\-\s]{10,15}$/, "Invalid phone number"],
    },
    address: addressSchema,
    weeklyMenu: {
      type: Map,
      of: dailyMenuSchema,
    },
    monthlyPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Mess", messSchema);
