const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    appType: {
      type: String,
      enum: ["Web App", "Android App", "IOS App"],
      required: true,
    },
    gitLink: {
      type: String,
      required: true,
    },
    uiLink: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
