import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        <CardDescription className="text-center">
          Manage your QuickPens account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Email</p>
          <p className="text-base">{user.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">User ID</p>
          <p className="text-base">{user.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Last Sign In</p>
          <p className="text-base">
            {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSignOut} 
          variant="outline" 
          className="w-full border-quickpens-navy text-quickpens-navy hover:bg-quickpens-navy hover:text-white"
          disabled={loading}
        >
          {loading ? 'Signing Out...' : 'Sign Out'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Profile;