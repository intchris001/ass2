import React, { useState } from 'react';
import LogoBar from '../components/LogoBar';
import { useSelectedCar } from '../context/SelectedCarContext';
import { Card, CardMedia, CardContent, Typography, Box, Alert } from '@mui/material';
import ReservationForm from '../components/ReservationForm';

const Reservation = () => {
  const { selectedCar, setSelectedCar } = useSelectedCar();
  const [status, setStatus] = useState(null); // null | 'success' | 'fail'
  const [formDisabled, setFormDisabled] = useState(false);

  // 模拟订单提交和车辆状态变更
  const handleSubmit = () => {
    if (!selectedCar.available) {
      setStatus('fail');
      setFormDisabled(true);
      return;
    }
    setStatus('success');
    setFormDisabled(true);
    setSelectedCar({ ...selectedCar, available: false });
    localStorage.removeItem('reservation_form');
  };

  const handleCancel = () => {
    setStatus(null);
    setFormDisabled(false);
    setSelectedCar(null);
    window.location.href = '/';
  };

  if (!selectedCar) {
    return (
      <div style={{ minHeight: '100vh', background: '#f7f9fb', paddingBottom: 40 }}>
        <LogoBar />
        <Typography variant="h6" align="center" mt={6}>
          Please select a car first.
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', paddingBottom: 40 }}>
      <LogoBar />
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 3 }}>
          <CardMedia
            component="img"
            height="180"
            image={selectedCar.image}
            alt={selectedCar.model}
            sx={{ objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedCar.brand} {selectedCar.model}</Typography>
            <Typography variant="body2" color="text.secondary">{selectedCar.type} - {selectedCar.description}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500 }}>Price: ${selectedCar.pricePerDay}/day</Typography>
            <Typography variant="subtitle2" color={selectedCar.available ? 'green' : 'red'} sx={{ mt: 1 }}>
              {selectedCar.available ? 'Available' : 'Unavailable'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {status === 'success' && <Alert severity="success" sx={{ mt: 3, maxWidth: 400, mx: 'auto' }}>Reservation successful!</Alert>}
      {status === 'fail' && <Alert severity="error" sx={{ mt: 3, maxWidth: 400, mx: 'auto' }}>Reservation failed, car is unavailable.</Alert>}
      {selectedCar.available && !formDisabled && (
        <ReservationForm car={selectedCar} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
      {!selectedCar.available && (
        <Alert severity="warning" sx={{ mt: 3, maxWidth: 400, mx: 'auto' }}>
          This car is unavailable. Please choose another car.
        </Alert>
      )}
    </div>
  );
};

export default Reservation; 