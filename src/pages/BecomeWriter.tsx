import React, { useState } from "react";

export default function BecomeWriter() {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Writer Application Submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Become a Writer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-3 rounded"
          placeholder="Tell us about yourself"
          onChange={(e) => setBio(e.target.value)}
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Skills (Essay, Coding, Research...)"
          onChange={(e) => setSkills(e.target.value)}
          required
        />

        <button className="bg-yellow-400 text-black px-6 py-3 rounded w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
}
