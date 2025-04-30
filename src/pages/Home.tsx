import React, { useState } from 'react';
import { useMode } from '@/contexts/ModeContext';
import AssignmentList from '@/components/AssignmentList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import AssignmentForm from '@/components/AssignmentForm';

export default function Home() {
  const { mode } = useMode();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-quickpens-navy">
          {mode === 'writer' ? 'Available Assignments' : 'My Assignments'}
        </h1>
        <div className="flex items-center space-x-4">
          {mode === 'buyer' && (
            <Modal
              title="Post New Assignment"
              trigger={
                <Button variant="default">
                  Post New Assignment
                </Button>
              }
            >
              <AssignmentForm onSuccess={() => {
                setSearchTerm('');
              }} />
            </Modal>
          )}
          {mode === 'writer' && (
            <div className="flex-1 max-w-md">
              <Label htmlFor="search" className="sr-only">
                Search assignments
              </Label>
              <Input
                id="search"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'writer' 
              ? 'Find assignments to write'
              : 'Manage your assignments'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AssignmentList
            selectedCollege=""
            isWriterMode={mode === 'writer'}
            searchTerm={searchTerm}
          />
        </CardContent>
      </Card>
    </div>
  );
}
