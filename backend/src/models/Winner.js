import mongoose from "mongoose";

const winnerSchema = mongoose.Schema({
  bid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
    required: true,
  },
  delivered: {
    type: Number,
    default: 0,
  },
  details: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;
