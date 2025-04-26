// src/components/MetricsView/TopBar.tsx
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { mockUsers } from '../../data/mockData';

interface TopBarProps {
  onUserSelect: (userId: number) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onUserSelect }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserSelect = (userId: number) => {
    onUserSelect(userId);
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Button variant="contained" onClick={handleOpen}>
        My Members
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Member</DialogTitle>
        <List>
          {mockUsers.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton onClick={() => handleUserSelect(user.id)}>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  );
};

export default TopBar;
