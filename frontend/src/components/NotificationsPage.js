import React, { useEffect, useState } from "react";
import { getIncomingSwaps, getOutgoingSwaps, respondSwapRequest } from "../api";
import "./SwapRequest.css";

export default function NotificationsPage({ token }) {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch incoming & outgoing swap requests
  useEffect(() => {
    async function loadRequests() {
      const incomingData = await getIncomingSwaps(token);
      const outgoingData = await getOutgoingSwaps(token);
      setIncoming(incomingData);
      setOutgoing(outgoingData);
    }
    loadRequests();
  }, [token]);

  // Handle Accept/Reject of swap
  async function handleSwapResponse(swapId, accept) {
    const res = await respondSwapRequest(swapId, accept, token);
    setMessage(res.message || "");

    // Refresh the lists
    const incomingData = await getIncomingSwaps(token);
    const outgoingData = await getOutgoingSwaps(token);
    setIncoming(incomingData);
    setOutgoing(outgoingData);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>📩 Notifications / Swap Requests</h2>

      {/* Incoming Swap Requests */}
      <section>
        <h3>Incoming Requests</h3>
        {incoming.length === 0 ? (
          <p>No incoming swap requests.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {incoming.map((swap) => (
              <li key={swap._id} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10, borderRadius: 6 }}>
                <strong>{swap.requesterId.name}</strong> wants to swap:
                <br />
                Your Slot: {swap.receiverSlotId.title} (
                {new Date(swap.receiverSlotId.startTime).toLocaleString()} -{" "}
                {new Date(swap.receiverSlotId.endTime).toLocaleString()})
                <br />
                Their Slot: {swap.requesterSlotId.title} (
                {new Date(swap.requesterSlotId.startTime).toLocaleString()} -{" "}
                {new Date(swap.requesterSlotId.endTime).toLocaleString()})
                <br />
                <button onClick={() => handleSwapResponse(swap._id, true)} style={{ marginRight: 10 }}>
                   Accept
                </button>
                <button onClick={() => handleSwapResponse(swap._id, false)}> Reject</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Outgoing Swap Requests */}
      <section style={{ marginTop: 30 }}>
        <h3>Outgoing Requests</h3>
        {outgoing.length === 0 ? (
          <p>No outgoing swap requests.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {outgoing.map((swap) => (
              <li key={swap._id} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10, borderRadius: 6 }}>
                Swap to: <strong>{swap.receiverId.name}</strong>
                <br />
                Your Slot: {swap.requesterSlotId.title} (
                {new Date(swap.requesterSlotId.startTime).toLocaleString()} -{" "}
                {new Date(swap.requesterSlotId.endTime).toLocaleString()})
                <br />
                Their Slot: {swap.receiverSlotId.title} (
                {new Date(swap.receiverSlotId.startTime).toLocaleString()} -{" "}
                {new Date(swap.receiverSlotId.endTime).toLocaleString()})
                <br />
                Status: {swap.status}
              </li>
            ))}
          </ul>
        )}
      </section>

      {message && <p style={{ marginTop: 20, color: "green" }}>{message}</p>}
    </div>
  );
}
