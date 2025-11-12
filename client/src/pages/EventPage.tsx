import React, { useEffect, useState } from "react";
import { eventApi, Event, CreateEventData } from "../api/eventApi";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // holds all events
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false); // toggle form visibility
  const [loading, setLoading] = useState<boolean>(false);

  // -----------------------------
  // Fetch events from backend
  // -----------------------------
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await eventApi.getAll(); // call your API
      setEvents(res.data.events);           // store events in state
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // -----------------------------
  // Create or Update Event
  // -----------------------------
  const handleCreateOrUpdate = async (data: CreateEventData) => {
    try {
      if (editingEvent) {
        await eventApi.update(editingEvent._id, data);
        setEditingEvent(null);
      } else {
        await eventApi.create(data);
      }

      setShowForm(false); // hide form after submission
      fetchEvents();      // refresh event list
    } catch (error) {
      console.error("Failed to create/update event:", error);
    }
  };

  // -----------------------------
  // Delete Event
  // -----------------------------
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await eventApi.delete(id);
        fetchEvents(); // refresh list after deletion
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  // -----------------------------
  // Edit Event
  // -----------------------------
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true); // show form for editing
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        🎉 Event Management Dashboard
      </h1>

      {/* Toggle Add Event Button */}
      {!showForm && !editingEvent && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            ➕ Add Event
          </button>
        </div>
      )}

      {/* Event Form */}
      {showForm && (
        <EventForm
          onSubmit={handleCreateOrUpdate}
          editingEvent={editingEvent}
          onCancelEdit={() => {
            setEditingEvent(null);
            setShowForm(false); // hide form if cancelled
          }}
        />
      )}

      {/* Loading & Event List */}
      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading events...</p>
      ) : (
        <EventList
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default EventPage;
