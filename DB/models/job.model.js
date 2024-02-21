import { Schema, model, Types } from "mongoose";

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      enm: ["onsite", "remotely", "hybrid"],
      required: true,
    },
    workingTime: {
      type: String,
      enm: ["part-time", "full-time"],
      required: true,
    },
    seniorityLevel: {
      type: String,
      enm: ["Junior", " Mid-Level", "Senior", "Team-Lead", "CTO"],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    technicalSkills: [String],
    softSkills: [String],
    addedBy: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.virtual("applications", {
  ref: "Application",
  localField: "_id",
  foreignField: "jobId",
});

const jobModel = model("Job", jobSchema);
export default jobModel;
