import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


const mockUsers = [
  { id: 1, name: 'Muskan' },
  { id: 2, name: 'Tia' },
  { id: 3, name: 'Ak' },
  { id: 4, name: 'Shivi' },
  { id: 5, name: 'Vs' },
];

interface TopBarProps {
  onUserSelect: (userId: number) => void;
}

const TopBar = ({ onUserSelect }: TopBarProps) => {
  const [open, setOpen] = useState(false);

  const handleUserClick = (userId: number) => {
    onUserSelect(userId);
    setOpen(false);
  };

  return (
    <>
      {/* <AppBar position="static" color="default" elevation={0}> */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {/* Dashboard */}
          </Typography>
          <Button variant="contained" color="primary"  onClick={() => setOpen(true)}>
            My Members
          </Button>
        </Toolbar>
      {/* </AppBar> */}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Select a Member
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {mockUsers.map((user) => (
            <Button
              key={user.id}
              fullWidth
              sx={{ marginBottom: 1 }}
              onClick={() => handleUserClick(user.id)}
            >
              {user.name}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopBar;
