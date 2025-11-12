import React from "react";
import { Event } from "../api/eventApi";

interface Props {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<Props> = ({ events, onEdit, onDelete }) => {
  if (events.length === 0)
    return <p className="text-center text-gray-500 mt-6">No events found.</p>;

  return (
    <div className="mt-6 grid gap-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="border p-4 rounded-xl bg-white shadow flex justify-between items-center hover:shadow-md transition"
        >
          <div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">
              📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-sm mt-1">{event.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(event)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
