import React, { useState } from 'react';
import TopBar from './TopBar';

const MetricsView = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
    console.log('Selected User ID:', userId);
 
  };

  return (
    <div>
      <TopBar onUserSelect={handleUserSelect} />
    </div>
  );
};

export default MetricsView;
