import mongoose from "mongoose";

const winnerSchema = mongoose.Schema({
  // user: mongoose.Schema.Types.ObjectId,
  bid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
    required: true,
  },
  // product: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;
