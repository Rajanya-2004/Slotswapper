import mongoose from "mongoose";



const swapRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requesterSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  receiverSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },
}, { timestamps: true });

const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
export default SwapRequest;
