const API_URL = "http://localhost:5000/api";

//  Register User
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

//  Login User
export async function loginUser(userData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

//  Get My Events
export async function getMyEvents(token) {
  try {
    const res = await fetch(`${API_URL}/events/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(" My Events API response:", data);

    // Ensure always returning an array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.events)) return data.events;
    return [];
  } catch (err) {
    console.error(" Error fetching events:", err);
    return [];
  }
}

//  Create Event
export async function createEvent(eventData, token) {
  try {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    console.log(" Event created response:", data);
    return data;
  } catch (err) {
    console.error(" Error creating event:", err);
    return { message: "Error creating event" };
  }
}

//  Update Event Status
export async function updateEventStatus(eventId, status, token) {
  try {
    const res = await fetch(`${API_URL}/events/${eventId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    console.log(" Update event status response:", data);
    return data;
  } catch (err) {
    console.error(" Error updating event status:", err);
    return { message: "Error updating event status" };
  }
}

//  Get Marketplace Events
export async function getMarketplaceEvents(token) {
  try {
    const res = await fetch(`${API_URL}/events/marketplace`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(" Marketplace events:", data);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(" Error fetching marketplace:", err);
    return [];
  }
}

//  Get Swappable Slots (Marketplace)
export async function getSwappableSlots(token) {
  try {
    const res = await fetch(`${API_URL}/swaps/swappable-slots`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("🟦 Swappable slots:", data);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("❌ Error fetching swappable slots:", err);
    return [];
  }
}

//  Create Swap Request
export async function createSwapRequest(mySlotId, theirSlotId, token) {
  try {
    const res = await fetch(`${API_URL}/swaps/swap-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mySlotId, theirSlotId }),
    });
    const data = await res.json();
    console.log("🟩 Swap request response:", data);
    return data;
  } catch (err) {
    console.error("❌ Error creating swap request:", err);
    return { error: "Server error" };
  }
}

//  Get Incoming Swap Requests
export async function getIncomingSwaps(token) {
  try {
    const res = await fetch(`${API_URL}/swaps/incoming`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching incoming swaps:", err);
    return [];
  }
}

//  Get Outgoing Swap Requests
export async function getOutgoingSwaps(token) {
  try {
    const res = await fetch(`${API_URL}/swaps/outgoing`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching outgoing swaps:", err);
    return [];
  }
}

//  Respond to a swap request (accept/reject)
export async function respondSwapRequest(swapId, accept, token) {
  try {
    const res = await fetch(`${API_URL}/swaps/swap-response/${swapId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accept }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error responding to swap request:", err);
    return { error: "Server error" };
  }
}


