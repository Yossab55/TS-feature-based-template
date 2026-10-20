import { Schema, model, type Model } from "mongoose";
import type { User } from "../../types/user.js";

const userSchema = new Schema<User>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    DOB: {
      type: Date,
      required: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    totalStudyHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    filedOfStudies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel: Model<User> = model<User>("User", userSchema);

export default UserModel;
