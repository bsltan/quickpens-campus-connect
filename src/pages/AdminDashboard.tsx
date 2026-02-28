import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    supabase.from("assignments").select("*")
      .then(({ data }) => setAssignments(data || []));
  }, []);

  return (
    <div className="p-6">
      <h1>Admin Panel</h1>

      {assignments.map((a:any) => (
        <div key={a.id} className="border p-3 mt-2">
          <p>{a.title}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}
