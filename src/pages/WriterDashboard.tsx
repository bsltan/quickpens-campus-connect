import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WriterDashboard() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    const { data } = await supabase
      .from("assignments")
      .select("*")
      .eq("status", "open");

    setAssignments(data || []);
  };
const uploadCompleted = async (file, id) => {
  const path = `completed/${Date.now()}-${file.name}`;

  await supabase.storage.from("assignments").upload(path, file);

  const { data } = supabase.storage
    .from("assignments")
    .getPublicUrl(path);

  await supabase
    .from("assignments")
    .update({
      completed_file_url: data.publicUrl,
      status: "completed",
    })
    .eq("id", id);
};
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Available Assignments</h1>

      {assignments.map((a: any) => (
        <div key={a.id} className="border p-4 mt-3">
          <h3>{a.title}</h3>

          <a href={a.file_url} download>
            Download Assignment
          </a>
        </div>
      ))}
    </div>
  );
}
