import React, { useState } from "react";

export default function PostAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Assignment Posted Successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Post an Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Assignment Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Assignment Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Budget (USD)"
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <button className="bg-blue-700 text-white px-6 py-3 rounded w-full">
          Submit Assignment
        </button>
      </form>
    </div>
  );
}
