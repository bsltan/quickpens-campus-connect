import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RoleSelection from '@/components/RoleSelection';
import CollegeSelector from '@/components/CollegeSelector';
import AssignmentList from '@/components/AssignmentList';
import { Button } from '@/components/ui/button'; // Assuming Button component exists
import { Input } from '@/components/ui/input'; // Assuming Input component exists

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedCollege, setSelectedCollege] = useState('');
  const [isWriterMode, setIsWriterMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search

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

  // Placeholder function for handling assignment posting
  const handlePostAssignment = () => {
    console.log('Navigate to post assignment page or open modal');
    // TODO: Implement navigation or modal logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <CollegeSelector
              value={selectedCollege}
              onChange={setSelectedCollege}
            />
            <RoleSelection 
              isWriter={isWriterMode}
              onToggle={handleRoleToggle}
            />
          </div>
          {!isWriterMode && (
            <Button onClick={handlePostAssignment} className="w-full md:w-auto">
              Post New Assignment
            </Button>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-quickpens-navy mb-3">Browse Assignments</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="text"
              placeholder="Search assignments by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            {/* Add Filter/Sort dropdowns here later */}
            <Button variant="outline">Filters</Button> 
          </div>
        </div>

        {/* Assignment List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-quickpens-navy mb-4">
            {isWriterMode ? 'Available Assignments' : 'Your Posted Assignments'}
          </h2>
          <AssignmentList
            selectedCollege={selectedCollege}
            isWriterMode={isWriterMode}
            searchTerm={searchTerm} // Pass search term down
            // Pass filter/sort states down later
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;