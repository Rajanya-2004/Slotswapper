import Event from "../models/event.js";

// Get my events
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user.id });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      startTime,
      endTime,
      status: "BUSY", // default
      owner: req.user.id,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get marketplace events (all SWAPPABLE events except my own)
export const getMarketplaceEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "SWAPPABLE",
      owner: { $ne: req.user.id }, // exclude logged-in user's events
    }).populate("owner", "name email"); // to show who posted it

    res.json(events);
  } catch (err) {
    console.error("Error fetching marketplace events:", err);
    res.status(500).json({ message: "Server error" });
  }
};
