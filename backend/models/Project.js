const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    studentName: String,
    studentEmail: String,
    rollNo: String,
    department: String,
    title: String,
    description: String,

    stage: { type: String, default: "Designing" },
    progress: { type: Number, default: 10 },

    marks: Number,
    remarks: String,

    status: { type: String, default: "pending" },
    locked: { type: Boolean, default: false },

    reviewedBy: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
