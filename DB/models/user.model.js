import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    recoveryEmail: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Company_HR"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    DOB: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    id: false,
  }
);
userSchema.virtual("userName").get(function () {
  return this.firstName + " " + this.lastName;
});
const userModel = model("User", userSchema);
export default userModel;
