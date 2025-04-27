import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { useState } from 'react';

const TopBar = ({ onUserSelect }: { onUserSelect: (userId: number) => void }) => {
  const [openDialog, setOpenDialog] = useState(false); 

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleUserSelect = (userId: number) => {
    onUserSelect(userId); 
    setOpenDialog(false); 
  };

  return (
    <Box>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="md" 
        fullWidth={true}
        sx={{
          '& .MuiDialog-paper': {
            padding: '20px', 
            borderRadius: '12px',
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#3f51b5' }}>
          Select a User
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
          <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <MenuItem onClick={() => handleUserSelect(1)} sx={{ fontSize: '1.1rem', fontWeight: 'bold', padding: '12px', borderRadius: '8px', '&:hover': { backgroundColor: '#f1f1f1' } }}>
              Muskan
            </MenuItem>
            <MenuItem onClick={() => handleUserSelect(2)} sx={{ fontSize: '1.1rem', fontWeight: 'bold', padding: '12px', borderRadius: '8px', '&:hover': { backgroundColor: '#f1f1f1' } }}>
              Tia
            </MenuItem>
            <MenuItem onClick={() => handleUserSelect(3)} sx={{ fontSize: '1.1rem', fontWeight: 'bold', padding: '12px', borderRadius: '8px', '&:hover': { backgroundColor: '#f1f1f1' } }}>
              Vaibhav
            </MenuItem>
            <MenuItem onClick={() => handleUserSelect(4)} sx={{ fontSize: '1.1rem', fontWeight: 'bold', padding: '12px', borderRadius: '8px', '&:hover': { backgroundColor: '#f1f1f1' } }}>
              Shivani
            </MenuItem>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: '20px', 
              padding: '10px 20px', 
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#3f51b5', 
                color: 'white', 
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          onClick={handleClickOpen} 
          variant="contained"
          sx={{
            borderRadius: '20px',  
            padding: '12px 20px',  
            backgroundColor: '#3f51b5',  
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#303f9f',  
            },
          }}
        >
          My Member
        </Button>
      </Box>
    </Box>
  );
};

export default TopBar;

