import mongoose, { Schema, Document } from "mongoose";
import validator, { trim } from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      trim: false,
      required: [true, "Password must be provided"],
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
