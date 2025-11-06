import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getMyEvents, createEvent,   getMarketplaceEvents, } from "../controller/eventController.js";
import Event from "../models/event.js";

const router = express.Router();

// Get all events for the logged-in user
router.get("/me", authMiddleware, getMyEvents);

// Create a new event
router.post("/", authMiddleware, createEvent);

router.get("/marketplace", authMiddleware, getMarketplaceEvents);

// Update event status (make swappable / swap_pending)
router.post("/:id/status", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    
    if (event.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    event.status = status;
    await event.save();
    res.json({ message: `Event status updated to ${status}`, event });
  } catch (err) {
    console.error("Error updating event status:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//  Get all swappable events except the current user's
router.get("/marketplace", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({
      status: "SWAPPABLE",
      owner: { $ne: req.user.id }, // exclude own events
    }).populate("owner", "name email");

    res.json(events);
  } catch (err) {
    console.error(" Marketplace error:", err);
    res.status(500).json({ message: "Server error while fetching marketplace" });
  }
});

export default router;
