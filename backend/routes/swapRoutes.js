import express from "express";
import authMiddleware from "../middleware/auth.js";
import Event from "../models/event.js";
import SwapRequest from "../models/swaprequest.js";

const router = express.Router();

//  Get all swappable slots (excluding current user's own)
router.get("/swappable-slots", authMiddleware, async (req, res) => {
  try {
    const slots = await Event.find({
      status: "SWAPPABLE",
      owner: { $ne: req.user.id },
    }).populate("owner", "name email");
    res.json(slots);
  } catch (err) {
    console.error("Error fetching swappable slots:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//  Create a swap request
router.post("/swap-request", authMiddleware, async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;

  try {
    const mySlot = await Event.findById(mySlotId);
    const theirSlot = await Event.findById(theirSlotId);

    if (!mySlot || !theirSlot)
      return res.status(404).json({ error: "Slot not found" });

    if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE")
      return res
        .status(400)
        .json({ error: "One of the slots is not swappable" });

    const swap = new SwapRequest({
      requesterId: req.user.id,
      receiverId: theirSlot.owner,
      requesterSlotId: mySlot._id,
      receiverSlotId: theirSlot._id,
    });

    await swap.save();

    // Mark both slots as pending
    mySlot.status = "SWAP_PENDING";
    theirSlot.status = "SWAP_PENDING";
    await mySlot.save();
    await theirSlot.save();

    res.json({ message: "Swap request created successfully", swap });
  } catch (err) {
    console.error("Error creating swap request:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//  Respond to a swap request
router.post("/swap-response/:id", authMiddleware, async (req, res) => {
  const { accept } = req.body;
  const { id } = req.params;

  try {
    // Find the swap request
    const swapRequest = await SwapRequest.findById(id);
    if (!swapRequest)
      return res.status(404).json({ error: "Swap request not found" });

    // Ensure only receiver can respond
    if (swapRequest.receiverId.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    // Get both slots
    const receiverSlot = await Event.findById(swapRequest.receiverSlotId);
    const requesterSlot = await Event.findById(swapRequest.requesterSlotId);

    if (!receiverSlot || !requesterSlot)
      return res.status(404).json({ error: "One or both slots not found" });

    //  If rejected → revert both to SWAPPABLE
    if (!accept) {
      swapRequest.status = "REJECTED";
      receiverSlot.status = "SWAPPABLE";
      requesterSlot.status = "SWAPPABLE";

      await receiverSlot.save();
      await requesterSlot.save();
      await swapRequest.save();

      return res.json({
        message: "Swap request rejected successfully.",
        swapRequest,
      });
    }

    //  If accepted → exchange ownership
    swapRequest.status = "ACCEPTED";

    const tempOwner = receiverSlot.owner;
    receiverSlot.owner = requesterSlot.owner;
    requesterSlot.owner = tempOwner;

    receiverSlot.status = "BUSY";
    requesterSlot.status = "BUSY";

    await receiverSlot.save();
    await requesterSlot.save();
    await swapRequest.save();

    res.json({
      message: "Swap request accepted successfully. Slots ownership swapped.",
      swapRequest,
    });
  } catch (err) {
    console.error("Error handling swap response:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /swaps/incoming - all swap requests where current user is the receiver
router.get("/incoming", authMiddleware, async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      receiverId: req.user.id,
    })
      .populate("requesterId", "name email")
      .populate("requesterSlotId")
      .populate("receiverSlotId");

    res.json(swaps);
  } catch (err) {
    console.error("Error fetching incoming requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /swaps/outgoing - all swap requests where current user is the requester
router.get("/outgoing", authMiddleware, async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      requesterId: req.user.id,
    })
      .populate("receiverId", "name email")
      .populate("requesterSlotId")
      .populate("receiverSlotId");

    res.json(swaps);
  } catch (err) {
    console.error("Error fetching outgoing requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
