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

type AssignmentClaim = {
  id: string;
  assignment_id: string;
  user_id: string;
  user_email: string;
  user_contact: string;
  status: 'pending' | 'accepted' | 'rejected';
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
  const [claims, setClaims] = useState<AssignmentClaim[]>([]);
  const [showClaimsModal, setShowClaimsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchAssignmentClaims = async () => {
      if (!user || !selectedAssignment) return;
      
      const { data: assignment } = await supabase
        .from('assignments')
        .select('created_by')
        .eq('id', selectedAssignment)
        .single();

      // Only fetch claims if user is the assignment owner
      if (assignment && assignment.created_by === user.id) {
        const { data, error } = await supabase
          .from('assignment_claims')
          .select(`
            id,
            assignment_id,
            user_id,
            user_email,
            user_contact,
            status,
            created_at
          `)
          .eq('assignment_id', selectedAssignment)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setClaims(data);
        } else {
          console.error('Error fetching claims:', error);
          toast({
            title: 'Error',
            description: 'Failed to load applications',
            variant: 'destructive',
          });
        }
      }
    };

    fetchAssignmentClaims();
  }, [selectedAssignment, user]);

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

  const handleApplyClaim = async (assignmentId: string) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please login to claim assignments',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Check if user has already applied
      const { data: existingClaims } = await supabase
        .from('assignment_claims')
        .select('*')
        .eq('assignment_id', assignmentId)
        .eq('user_id', user.id)
        .single();

      if (existingClaims) {
        toast({
          title: 'Error',
          description: 'You have already applied for this assignment',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('assignment_claims')
        .insert({
          assignment_id: assignmentId,
          user_id: user.id,
          user_email: user.email,
          user_contact: '', // This should be filled from user profile if available
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Application submitted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application',
        variant: 'destructive',
      });
    }
  };

  const handleViewClaims = async (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
    setShowClaimsModal(true);
  };

  const handleUpdateClaimStatus = async (claimId: string, newStatus: 'accepted' | 'rejected') => {
    try {
      // Check if any claim is already accepted for this assignment
      if (newStatus === 'accepted') {
        const claim = claims.find(c => c.id === claimId);
        if (!claim) return;

        const { data: existingAccepted } = await supabase
          .from('assignment_claims')
          .select('id')
          .eq('assignment_id', claim.assignment_id)
          .eq('status', 'accepted')
          .single();

        if (existingAccepted) {
          toast({
            title: 'Error',
            description: 'Another application has already been accepted for this assignment',
            variant: 'destructive',
          });
          return;
        }

        // Update assignment status first
        const { error: assignmentError } = await supabase
          .from('assignments')
          .update({ status: 'claimed' })
          .eq('id', claim.assignment_id)
          .eq('status', 'available'); // Only update if still available

        if (assignmentError) {
          toast({
            title: 'Error',
            description: 'This assignment has already been claimed',
            variant: 'destructive',
          });
          return;
        }

        // Update local assignments state
        setAssignments(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.id === claim.assignment_id
              ? { ...assignment, status: 'claimed' }
              : assignment
          )
        );
      }

      // Update claim status
      const { error } = await supabase
        .from('assignment_claims')
        .update({ status: newStatus })
        .eq('id', claimId);

      if (error) throw error;

      // Update local claims state
      setClaims(prevClaims => 
        prevClaims.map(claim => 
          claim.id === claimId ? { ...claim, status: newStatus } : claim
        )
      );

      // If accepting, reject all other claims
      if (newStatus === 'accepted') {
        const claim = claims.find(c => c.id === claimId);
        if (claim) {
          const { error: rejectError } = await supabase
            .from('assignment_claims')
            .update({ status: 'rejected' })
            .eq('assignment_id', claim.assignment_id)
            .neq('id', claimId);

          if (!rejectError) {
            // Update local state for other claims
            setClaims(prevClaims =>
              prevClaims.map(c =>
                c.assignment_id === claim.assignment_id && c.id !== claimId
                  ? { ...c, status: 'rejected' }
                  : c
              )
            );
          }
        }
      }

      toast({
        title: 'Success',
        description: `Application ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating claim status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update application status',
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
                {isWriterMode && assignment.status === 'available' && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => handleApplyClaim(assignment.id)}
                  >
                    Apply to Claim
                  </Button>
                )}
                {!isWriterMode && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => handleViewClaims(assignment.id)}
                    >
                      View Applications
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full sm:w-auto"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      Delete
                    </Button>
                  </>
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
      {showClaimsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Assignment Applications</h2>
              <Button variant="outline" onClick={() => setShowClaimsModal(false)}>
                Close
              </Button>
            </div>
            {claims.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="border p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p><strong>Writer Email:</strong> {claim.user_email}</p>
                        <p><strong>Contact:</strong> {claim.user_contact || 'Not provided'}</p>
                        <p><strong>Status:</strong> <span className={
                          claim.status === 'accepted' ? 'text-green-600' :
                          claim.status === 'rejected' ? 'text-red-600' :
                          'text-yellow-600'
                        }>{claim.status}</span></p>
                        <p><strong>Applied on:</strong> {new Date(claim.created_at).toLocaleDateString()}</p>
                      </div>
                      {claim.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleUpdateClaimStatus(claim.id, 'accepted')}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleUpdateClaimStatus(claim.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}