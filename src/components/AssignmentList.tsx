import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Assignment = {
  id: string;
  topic: string;
  subject: string;
  description: string;
  college_slug: string;
  deadline: string;
  estimated_pages: number;
  contact_details: string;
  status: 'available' | 'claimed' | 'completed';
  created_by: string;
  created_at: string;
};

export default function AssignmentList({
  selectedCollege,
  isWriterMode,
  searchTerm,
}: {
  selectedCollege: string;
  isWriterMode: boolean;
  searchTerm: string;
}) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);

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
        setFilteredAssignments(data);
      }
    };

    fetchAssignments();
  }, [selectedCollege, isWriterMode]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAssignments(assignments);
      return;
    }

    const filtered = assignments.filter((assignment) =>
      assignment.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssignments(filtered);
  }, [searchTerm, assignments]);

  return (
    <div className="space-y-4">
      {filteredAssignments.length > 0 ? (
        filteredAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>
                {assignment.topic} - {assignment.subject}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <div className="space-y-2">
                    <p className="text-gray-600">{assignment.description}</p>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-500">
                      <div>Pages: {assignment.estimated_pages}</div>
                      <div>Contact: {assignment.contact_details}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm">
                    Status:{' '}
                    <span className={`capitalize ${
                      assignment.status === 'available' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {assignment.status}
                    </span>
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                disabled={!isWriterMode && assignment.status !== 'available'}
              >
                {isWriterMode ? 'Claim Assignment' : 'View Details'}
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent>
            <p className="text-gray-500">No assignments found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}