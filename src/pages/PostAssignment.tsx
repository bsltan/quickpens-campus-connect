import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function PostAssignment() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const uploadAssignment = async () => {
    if (!file) return;

    const filePath = `student/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("assignments")
      .upload(filePath, file);

    if (uploadError) return alert(uploadError.message);

    const { data } = supabase.storage
      .from("assignments")
      .getPublicUrl(filePath);

    await supabase.from("assignments").insert({
      title,
      student_id: user.id,
      file_url: data.publicUrl,
    });

    alert("Assignment uploaded!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Post Assignment</h2>

      <input
        className="border p-2 mb-3 w-full"
        placeholder="Assignment Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept=".doc,.docx,.pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={uploadAssignment}
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        Upload Assignment
      </button>
    </div>
  );
}
