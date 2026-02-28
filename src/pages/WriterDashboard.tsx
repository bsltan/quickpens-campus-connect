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
