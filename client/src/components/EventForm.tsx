import React, { useState, useEffect } from "react";
import { CreateEventData, Event } from "../api/eventApi";

interface Props {
  onSubmit: (data: CreateEventData) => void;
  editingEvent?: Event | null;
  onCancelEdit?: () => void;
}

const EventForm: React.FC<Props> = ({ onSubmit, editingEvent, onCancelEdit }) => {
  const [formData, setFormData] = useState<CreateEventData>({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        date: editingEvent.date.split("T")[0],
        location: editingEvent.location,
        description: editingEvent.description || "",
      });
    }
  }, [editingEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", date: "", location: "", description: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-md space-y-3 border"
    >
      <h2 className="text-xl font-semibold mb-3">
        {editingEvent ? "✏️ Update Event" : "➕ Create New Event"}
      </h2>

      <div className="grid gap-2">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingEvent ? "Update" : "Create"}
        </button>

        {editingEvent && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
