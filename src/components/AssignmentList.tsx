import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Assignment = {
  id: string;
  title: string;
  description: string;
  college_slug: string;
  deadline: string;
  status: 'available' | 'claimed' | 'completed';
};

export default function AssignmentList({
  selectedCollege,
  isWriterMode,
}: {
  selectedCollege: string;
  isWriterMode: boolean;
}) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      let query = supabase.from('assignments').select('*');

      if (selectedCollege) {
        query = query.eq('college_slug', selectedCollege);
      }

      if (isWriterMode) {
        query = query.eq('status', 'available');
      }

      const { data, error } = await query;

      if (!error && data) {
        setAssignments(data);
      }
    };

    fetchAssignments();
  }, [selectedCollege, isWriterMode]);

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <div
          key={assignment.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-quickpens-navy">
                {assignment.title}
              </h3>
              <p className="text-gray-600 mt-1">{assignment.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className={`capitalize ${assignment.status === 'available' ? 'text-green-600' : 'text-blue-600'}`}>
                  {assignment.status}
                </span>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-quickpens-navy text-white rounded-lg hover:bg-opacity-90 transition-colors"
              disabled={!isWriterMode && assignment.status !== 'available'}
            >
              {isWriterMode ? 'Claim Assignment' : 'View Details'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}