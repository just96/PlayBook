import mongoose from "mongoose";

const tacticSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    map: {
      type: String,
      required: true,
      enum: ["Dust2", "Mirage", "Inferno", "Nuke", "Train", "Overpass", "Ancient"],
    },
    side: {
      type: String,
      required: true,
      enum: ["CT", "T"],
    },
    zone: {
      type: String,
      required: true,
      enum: ["Bombsite A", "Bombsite B", "Other"],
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    effectiveness: {
      type: String,
      required: true,
      enum: ["Low", "Mid", "High"],
    },
  },
  { timestamps: true }
);

const Tactic = mongoose.model("Tactic", tacticSchema);

export default Tactic;
