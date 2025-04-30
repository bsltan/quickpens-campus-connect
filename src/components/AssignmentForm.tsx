import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AssignmentFormProps {
  onSuccess?: () => void;
}

export default function AssignmentForm({ onSuccess }: AssignmentFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    subject: '',
    deadline: '',
    estimated_pages: '',
    description: '',
    contact_details: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('assignments')
        .insert({
          topic: formData.topic,
          subject: formData.subject,
          deadline: formData.deadline,
          estimated_pages: formData.estimated_pages,
          description: formData.description,
          contact_details: formData.contact_details,
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
              placeholder="Enter subject name"
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
              type="datetime-local"
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
              min="1"
              value={formData.estimatedPages}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide details about the assignment requirements"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="contactDetails">Contact Details</Label>
            <Textarea
              id="contactDetails"
              name="contactDetails"
              placeholder="How writers can contact you (email, phone, etc.)"
              value={formData.contactDetails}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Assignment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
