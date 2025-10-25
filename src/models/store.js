import mongoose, { Schema, models } from "mongoose";

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // identificador único para URL o consulta
      lowercase: true,
    },
    description: {
      type: String,
    },
    logo: {
      type: String, // URL de imagen
    },
    category: {
      type: String,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // agrega createdAt y updatedAt
);

const Store = models.Store || mongoose.model("Store", StoreSchema);
export default Store;
