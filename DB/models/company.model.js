import { Schema, model, Types } from "mongoose";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    numberOfEmployees: {
      from: Number,
      to: Number,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
    },
    companyHr: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

companySchema.virtual("jobs", {
  ref: "Job",
  foreignField: "companyId",
  localField: "_id",
});

companySchema.pre(/^find/, function () {
  this.populate("jobs");
});

const companyModel = model("Company", companySchema);

export default companyModel;
