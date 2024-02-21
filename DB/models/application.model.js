import { Schema, model, Types } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: {
      type: Types.ObjectId,
      ref: "job",
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    userResume: { type: Object, required: true },
    userTechSkills: [{ type: String, required: true }],
    userSoftSkills: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const applicationModel = model("Application", applicationSchema);
export default applicationModel;
