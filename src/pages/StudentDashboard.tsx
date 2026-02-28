import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    supabase
      .from("assignments")
      .select("*")
      .eq("student_id", user.id)
      .then(({ data }) => setAssignments(data || []));
  }, []);

  return (
    <div className="p-6">
      <h1>Your Assignments</h1>

      {assignments.map((a:any) => (
        <div key={a.id}>
          <p>{a.title}</p>

          {a.completed_file_url && (
            <a href={a.completed_file_url} download>
              Download Completed Work
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
