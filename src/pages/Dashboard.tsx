import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RoleSelection from '@/components/RoleSelection';
import CollegeSelector from '@/components/CollegeSelector';
import AssignmentList from '@/components/AssignmentList';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedCollege, setSelectedCollege] = useState('');
  const [isWriterMode, setIsWriterMode] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setIsWriterMode(savedRole === 'writer');
    }
  }, []);

  const handleRoleToggle = () => {
    const newMode = !isWriterMode;
    setIsWriterMode(newMode);
    localStorage.setItem('userRole', newMode ? 'writer' : 'buyer');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <CollegeSelector
            value={selectedCollege}
            onChange={setSelectedCollege}
          />
          
          <RoleSelection 
            isWriter={isWriterMode}
            onToggle={handleRoleToggle}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-quickpens-navy mb-4">
            {isWriterMode ? 'Available Assignments' : 'Your Assignments'}
          </h2>
          <AssignmentList
            selectedCollege={selectedCollege}
            isWriterMode={isWriterMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;