import React, { useEffect, useState } from "react";
import { getSwappableSlots, createSwapRequest, getMyEvents } from "../api";

export default function Marketplace({ token }) {
  const [events, setEvents] = useState([]); // other users' swappable events
  const [mySwappableSlots, setMySwappableSlots] = useState([]); // my swappable events
  const [selectedMySlot, setSelectedMySlot] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const swappableEvents = await getSwappableSlots(token);
        const myEvents = await getMyEvents(token);

        // Only include user's swappable events for initiating swaps
        const mySwappable = myEvents.filter((e) => e.status === "SWAPPABLE");

        setEvents(swappableEvents);
        setMySwappableSlots(mySwappable);
      } catch (err) {
        console.error("Error loading marketplace data:", err);
      }
    }
    loadData();
  }, [token]);

  //  Handle Swap Request
  async function handleRequestSwap(theirSlotId) {
    if (!selectedMySlot) {
      setMessage("Please select one of your swappable slots first.");
      return;
    }

    const res = await createSwapRequest(selectedMySlot, theirSlotId, token);
    if (res.error) {
      setMessage(` ${res.error}`);
    } else {
      setMessage(` Swap request sent successfully!`);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>🛍️ Slot Marketplace</h2>
      <p>View all available swappable events posted by other users.</p>

      {/*  Select My Slot for Swap */}
      {mySwappableSlots.length > 0 ? (
        <div style={{ marginBottom: 20 }}>
          <label>
            <strong>Select one of your swappable slots:</strong>
          </label>
          <select
            value={selectedMySlot}
            onChange={(e) => setSelectedMySlot(e.target.value)}
            style={{ marginLeft: 10, padding: 5 }}
          >
            <option value="">-- Choose My Slot --</option>
            {mySwappableSlots.map((slot) => (
              <option key={slot._id} value={slot._id}>
                {slot.title} ({new Date(slot.startTime).toLocaleString()} -{" "}
                {new Date(slot.endTime).toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>⚠️ You have no swappable slots. Go to Dashboard to make one swappable.</p>
      )}

      {/*  Marketplace Events */}
      {events.length === 0 ? (
        <p>No swappable events available right now.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((ev) => (
            <li
              key={ev._id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <strong>{ev.title}</strong> <br />
              From: {new Date(ev.startTime).toLocaleString()} <br />
              To: {new Date(ev.endTime).toLocaleString()} <br />
              Posted by: {ev.owner?.name || ev.userId?.name || "Unknown"} <br />
              <button
                onClick={() => handleRequestSwap(ev._id)}
                style={{
                  marginTop: 10,
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Request Swap
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && <p style={{ marginTop: 20, color: "green" }}>{message}</p>}
    </div>
  );
}
