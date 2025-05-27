import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelectedCar } from '../context/SelectedCarContext';
import carsData from '../data/cars';

const CarGrid = ({ cars }) => {
  const navigate = useNavigate();
  const { setSelectedCar } = useSelectedCar();
  const carList = cars || carsData;

  const handleRent = (car) => {
    setSelectedCar(car);
    navigate('/reservation');
  };

  if (carList.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 6, color: 'text.secondary' }}>
        No cars found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {carList.map((car) => (
        <Grid item xs={12} sm={6} md={4} key={car.id}>
          <Card sx={{ boxShadow: 3, borderRadius: 3, transition: '0.2s', ':hover': { boxShadow: 6 } }}>
            <Box sx={{ height: 180, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
              <CardMedia
                component="img"
                image={car.image}
                alt={car.model}
                sx={{ height: 160, width: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: 2 }}
              />
            </Box>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{car.brand} {car.model}</Typography>
              <Typography variant="body2" color="text.secondary">{car.type} - {car.description}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500 }}>Price: ${car.pricePerDay}/day</Typography>
              <Button
                variant="contained"
                color={car.available ? 'primary' : 'inherit'}
                disabled={!car.available}
                sx={{ mt: 2, width: '100%', fontWeight: 600, letterSpacing: 1 }}
                onClick={() => handleRent(car)}
              >
                {car.available ? 'Rent' : 'Unavailable'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CarGrid; 