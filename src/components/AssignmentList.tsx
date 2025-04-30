import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Mail, Search } from 'lucide-react';

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
  const { user } = useAuth();
  const { toast } = useToast();

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      
      let query = supabase.from('assignments').select('*');

      if (selectedCollege) {
        query = query.eq('college_slug', selectedCollege);
      }

      // Filter assignments based on user role
      if (isWriterMode) {
        query = query.eq('status', 'available');
      } else if (user) {
        query = query.eq('created_by', user.id);
      }

      const { data, error } = await query;

      if (!error && data) {
        setAssignments(data);
        setFilteredAssignments(data);
      }

      setIsLoading(false);
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

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', assignmentId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Assignment deleted successfully',
      });

      // Refresh assignments
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
      setFilteredAssignments(prev => prev.filter(a => a.id !== assignmentId));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete assignment',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredAssignments.length > 0 ? (
        filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                <div className="flex items-center justify-between">
                  <span>{assignment.topic} - {assignment.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                    </span>
                    <Badge
                      variant={
                        assignment.status === 'available' ? 'default' : 'secondary'
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="text-gray-600 line-clamp-3">
                  {assignment.description}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{assignment.estimated_pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{assignment.contact_details}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={!isWriterMode && assignment.status !== 'available'}
                >
                  {isWriterMode ? 'Claim Assignment' : 'View Details'}
                </Button>
                {!isWriterMode && user?.id === assignment.created_by && (
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => handleDeleteAssignment(assignment.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Search className="w-12 h-12 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">
                No assignments found
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'No assignments match your search criteria.' : 'No assignments available.'}
              </p>
              {isWriterMode && (
                <Button variant="outline" className="mt-4">
                  Post a New Assignment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}