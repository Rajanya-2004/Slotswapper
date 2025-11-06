/*import React, { useState, useEffect } from "react";
import { getMyEvents, createEvent, updateEventStatus } from "../api";
import "./Dashboard.css";

export default function Dashboard({ token }) {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });
  const [message, setMessage] = useState("");

  // Load events
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await getMyEvents(token);
        if (res.events && Array.isArray(res.events)) setEvents(res.events);
        else if (Array.isArray(res)) setEvents(res);
        else setEvents([]);
      } catch (err) {
        console.error("Error loading events:", err);
        setEvents([]);
      }
    }
    loadEvents();
  }, [token]);

  // Add new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createEvent(form, token);
      setMessage(res.message || "Event created successfully!");

      // Reload events
      const updatedEvents = await getMyEvents(token);
      if (updatedEvents.events) setEvents(updatedEvents.events);
      else setEvents(updatedEvents);

      setForm({ title: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error("Error creating event:", err);
      setMessage("Failed to create event");
    }
  };

  // Make event swappable
  const handleMakeSwappable = async (eventId) => {
    try {
      const res = await updateEventStatus(eventId, "SWAPPABLE", token);
      setMessage(res.message || "Event marked as swappable");

      const updatedEvents = await getMyEvents(token);
      if (updatedEvents.events) setEvents(updatedEvents.events);
      else setEvents(updatedEvents);
    } catch (err) {
      console.error("Error updating event:", err);
      setMessage("Failed to update event status");
    }
  };

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>

      {message && <p className="dashboard-message">{message}</p>}

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          className="dashboard-input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="dashboard-input"
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
        />
        <input
          className="dashboard-input"
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          required
        />
        <button type="submit" className="dashboard-btn">Add Event</button>
      </form>

      <h3>My Events</h3>
           {events.length === 0 ? (
             <p>No events found</p>
          ) : (
         <ul className="events">
            {events.map((ev) => (
               <li key={ev._id}>
                 <div className="event-info">
                    <span className="event-title">{ev.title}</span>
                    <span className="event-status">{ev.status}</span>
                 </div>
              <div className="event-time">
                  {new Date(ev.startTime).toLocaleString()} — {new Date(ev.endTime).toLocaleString()}
              </div>
                  {ev.status === "BUSY" && (
                  <button onClick={() => handleMakeSwappable(ev._id)}>Make Swappable</button>
             )}
          </li>
        ))}
       </ul>
        )}

    </div>
  );
}*/

import React, { useState, useEffect } from "react";
import { getMyEvents, createEvent, updateEventStatus } from "../api";
import "./Dashboard.css";

export default function Dashboard({ token }) {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });

  // Load events
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await getMyEvents(token);
        if (Array.isArray(res)) setEvents(res);
        else if (Array.isArray(res.events)) setEvents(res.events);
        else setEvents([]);
      } catch (err) {
        console.error("Error loading events:", err);
        setEvents([]);
      }
    }
    loadEvents();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createEvent(form, token);
      alert(res.message || "Event created!");
      const updatedEvents = await getMyEvents(token);
      if (updatedEvents.events) setEvents(updatedEvents.events);
      else setEvents(updatedEvents);
      setForm({ title: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };

  const handleMakeSwappable = async (eventId) => {
    try {
      const res = await updateEventStatus(eventId, "SWAPPABLE", token);
      alert(res.message || "Event marked as swappable");
      const updatedEvents = await getMyEvents(token);
      if (updatedEvents.events) setEvents(updatedEvents.events);
      else setEvents(updatedEvents);
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event status");
    }
  };

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>

      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="event-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {/* My Events */}
      <h3>My Events</h3>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className="events">
          {events.map((ev) => (
            <li key={ev._id}>
              <strong>{ev.title}</strong> —{" "}
              {new Date(ev.startTime).toLocaleString()} to{" "}
              {new Date(ev.endTime).toLocaleString()} — {ev.status}
              {ev.status === "BUSY" && (
                <button
                  className="make-swappable"
                  onClick={() => handleMakeSwappable(ev._id)}
                >
                  Make Swappable
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

