import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface AssignmentFormProps {
  onSuccess?: () => void;
}

type Profile = {
  id: string;
  email: string;
  phone_number: string | null;
};

export default function AssignmentForm({ onSuccess }: AssignmentFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    topic: '',
    subject: '',
    deadline: '',
    estimated_pages: '',
    description: '',
    contact_details: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(data);
        // Pre-fill contact details with profile data
        setFormData(prev => ({
          ...prev,
          contact_details: data.phone_number || ''
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if contact details are available
      if (!profile?.phone_number && !formData.contact_details) {
        toast({
          title: 'Missing Contact Details',
          description: (
            <div>
              Please add your contact number in your <Link to="/profile" className="underline">profile</Link> or provide it in the form.
            </div>
          ),
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('assignments')
        .insert({
          topic: formData.topic,
          subject: formData.subject,
          deadline: formData.deadline,
          estimated_pages: formData.estimated_pages,
          description: formData.description,
          contact_details: profile?.phone_number || formData.contact_details,
          college_slug: user?.user_metadata?.college_slug || '',
          status: 'available',
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your assignment has been posted successfully.',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to post assignment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle snake_case field names
    const fieldName = name === 'estimatedPages' ? 'estimated_pages' :
                     name === 'contactDetails' ? 'contact_details' :
                     name;
    
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post New Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="Enter assignment topic"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="estimatedPages">Estimated Pages</Label>
            <Input
              id="estimatedPages"
              name="estimatedPages"
              type="number"
              placeholder="Enter estimated pages"
              value={formData.estimated_pages}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter assignment description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {!profile?.phone_number && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="contactDetails">Contact Details</Label>
                <Link 
                  to="/profile" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Add to profile instead
                </Link>
              </div>
              <Input
                id="contactDetails"
                name="contactDetails"
                placeholder="Enter your contact number"
                value={formData.contact_details}
                onChange={handleChange}
              />
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Posting...' : 'Post Assignment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
