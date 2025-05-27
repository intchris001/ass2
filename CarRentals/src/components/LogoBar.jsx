import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const LogoBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="default" sx={{ mb: 2, boxShadow: 3, bgcolor: '#fff' }}>
      <Toolbar>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold', color: '#1976d2', letterSpacing: 2 }}
          onClick={() => navigate('/')}
        >
          CarRentals
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default LogoBar; 