import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useMode } from '@/contexts/ModeContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

type Assignment = {
  id: string;
  topic: string;
  subject: string;
  deadline: string;
  estimated_pages: number;
  description: string;
  contact_details: string;
  status: string;
  created_by: string;
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

type DeleteConfirmation = {
  type: 'assignment' | 'claim';
  id: string;
} | null;

export default function AssignmentList() {
  const { user } = useAuth();
  const { mode } = useMode();
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [claims, setClaims] = useState<AssignmentClaim[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const query = mode === 'writer' 
          ? supabase.from('assignments').select('*').eq('status', 'available')
          : supabase.from('assignments').select('*').eq('created_by', user?.id);

        const { data, error } = await query;
        if (error) throw error;
        setAssignments(data || []);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast({
          title: 'Error',
          description: 'Failed to load assignments',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAssignments();
    }
  }, [user, mode]);

  useEffect(() => {
    const fetchAssignmentClaims = async () => {
      if (!user || !selectedAssignment) return;
      
      try {
        const { data, error } = await supabase
          .from('assignment_claims')
          .select('*')
          .eq('assignment_id', selectedAssignment);

        if (error) throw error;
        console.log('Fetched claims:', data); // Debug log
        setClaims(data || []);
      } catch (error) {
        console.error('Error fetching claims:', error);
        toast({
          title: 'Error',
          description: 'Failed to load applications',
          variant: 'destructive',
        });
      }
    };

    fetchAssignmentClaims();
  }, [selectedAssignment, user]);

  const handleApplyClaim = async (assignmentId: string) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in to apply for assignments',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('phone_number')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      if (!profile?.phone_number) {
        toast({
          title: 'Missing Contact Details',
          description: (
            <div>
              Please add your contact number in your <Link to="/profile" className="underline">profile</Link> before applying.
            </div>
          ),
          variant: 'destructive',
        });
        return;
      }

      const { data: existingClaim } = await supabase
        .from('assignment_claims')
        .select('id')
        .eq('assignment_id', assignmentId)
        .eq('user_id', user.id)
        .single();

      if (existingClaim) {
        toast({
          title: 'Already Applied',
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
          user_contact: profile.phone_number,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Application submitted successfully',
      });
    } catch (error) {
      console.error('Error applying for assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit application',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateClaimStatus = async (claimId: string, newStatus: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('assignment_claims')
        .update({ status: newStatus })
        .eq('id', claimId);

      if (error) throw error;

      setClaims(prevClaims => 
        prevClaims.map(claim => 
          claim.id === claimId 
            ? { ...claim, status: newStatus }
            : claim.status === 'accepted' && newStatus === 'accepted'
              ? { ...claim, status: 'rejected' }
              : claim
        )
      );

      toast({
        title: 'Success',
        description: `Application ${newStatus} successfully`,
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

  const handleViewApplications = async (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
    setIsDialogOpen(true);
    
    try {
      const { data, error } = await supabase
        .from('assignment_claims')
        .select('*')
        .eq('assignment_id', assignmentId);

      if (error) throw error;
      console.log('Fetched claims:', data); // Debug log
      setClaims(data || []);
    } catch (error) {
      console.error('Error fetching claims:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', assignmentId);

      if (error) throw error;

      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
      toast({
        title: 'Success',
        description: 'Assignment deleted successfully',
      });
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete assignment',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClaim = async (claimId: string) => {
    try {
      const { error } = await supabase
        .from('assignment_claims')
        .delete()
        .eq('id', claimId);

      if (error) throw error;

      setClaims(prev => prev.filter(c => c.id !== claimId));
      toast({
        title: 'Success',
        description: 'Application deleted successfully',
      });
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete application',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {mode === 'writer' ? 'Available Assignments' : 'Your Posted Assignments'}
      </h2>

      {assignments.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              {mode === 'writer' 
                ? 'No available assignments found.' 
                : 'You have not posted any assignments yet.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <CardTitle>{assignment.topic}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <strong>Subject:</strong> {assignment.subject}
                  </div>
                  <div>
                    <strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Pages:</strong> {assignment.estimated_pages}
                  </div>
                  <div>
                    <strong>Description:</strong> {assignment.description}
                  </div>
                  {mode === 'writer' && (
                    <Button 
                      onClick={() => handleApplyClaim(assignment.id)}
                      className="mt-4"
                    >
                      Apply to Claim
                    </Button>
                  )}
                  {mode === 'buyer' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleViewApplications(assignment.id)}
                      >
                        View Applications
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => setDeleteConfirmation({ type: 'assignment', id: assignment.id })}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assignment Applications</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {claims.length === 0 ? (
              <p className="text-center text-gray-500">No applications received yet.</p>
            ) : (
              <div className="space-y-4">
                {claims.map((claim) => (
                  <Card key={claim.id}>
                    <CardContent className="pt-4">
                      <div className="grid gap-2">
                        <div>
                          <strong>Email:</strong> {claim.user_email}
                        </div>
                        <div>
                          <strong>Contact:</strong> {claim.user_contact}
                        </div>
                        <div>
                          <strong>Status:</strong>{' '}
                          <span className={
                            claim.status === 'accepted' ? 'text-green-600' :
                            claim.status === 'rejected' ? 'text-red-600' :
                            'text-yellow-600'
                          }>
                            {claim.status}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {claim.status === 'pending' && (
                            <>
                              <Button
                                onClick={() => handleUpdateClaimStatus(claim.id, 'accepted')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleUpdateClaimStatus(claim.id, 'rejected')}
                                variant="destructive"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => setDeleteConfirmation({ type: 'claim', id: claim.id })}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirmation} onOpenChange={() => setDeleteConfirmation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>Are you sure you want to delete this {deleteConfirmation?.type}? This action cannot be undone.</p>
            <div className="flex gap-2 mt-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmation(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteConfirmation?.type === 'assignment') {
                    handleDeleteAssignment(deleteConfirmation.id);
                  } else if (deleteConfirmation?.type === 'claim') {
                    handleDeleteClaim(deleteConfirmation.id);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}