import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ReservationIcon = () => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Reservation">
      <IconButton onClick={() => navigate('/reservation')} color="primary" sx={{ position: 'absolute', top: 20, right: 30 }}>
        <EventAvailableIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default ReservationIcon; 