import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    simulationId: { type: mongoose.Schema.Types.ObjectId, ref: "Simulation", required: true },
    status: {
      type: String,
      enum: ["enrolled", "in-progress", "completed"],
      default: "enrolled",
    },
    progress: { type: Number, default: 0 }, // 0 to 100 %
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;
