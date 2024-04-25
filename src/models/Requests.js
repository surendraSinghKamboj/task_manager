const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    remark: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Requests = mongoose.model("Requests", requestSchema);

module.exports = Requests;
