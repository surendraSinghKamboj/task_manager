const mongoose = require("mongoose");

// Task schema
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Developer Tasks", "Designer Tasks", "Creative Tasks"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Not Assigned",
        "Assigned",
        "In Progress",
        "Completed",
        "Fixing",
        "Fixed",
      ],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startedOn: {
      type: Date,
    },
    completedInTime: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Assuming there's a Project schema
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
