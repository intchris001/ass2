import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

const initialState = {
  name: '',
  phone: '',
  email: '',
  license: '',
  startDate: '',
  days: '',
};

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Required';
  if (!/^\d{10,}$/.test(values.phone)) errors.phone = 'Invalid phone';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Invalid email';
  if (!values.license) errors.license = 'Required';
  if (!values.startDate) errors.startDate = 'Required';
  if (!/^[1-9]\d*$/.test(values.days)) errors.days = 'Invalid days';
  return errors;
};

const FORM_KEY = 'reservation_form';

const ReservationForm = ({ car, onSubmit, onCancel }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    // 自动预填
    const saved = localStorage.getItem(FORM_KEY);
    if (saved) setValues(JSON.parse(saved));
  }, []);

  useEffect(() => {
    // 离开页面自动保存
    localStorage.setItem(FORM_KEY, JSON.stringify(values));
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
  };

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  const isValid = Object.keys(errors).length === 0 && Object.values(values).every(v => v);
  const total = car ? car.pricePerDay * (parseInt(values.days) || 0) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, license: true, startDate: true, days: true });
    if (isValid && onSubmit) onSubmit(values, total);
  };

  const handleCancel = () => {
    setValues(initialState);
    setTouched({});
    localStorage.removeItem(FORM_KEY);
    if (onCancel) onCancel();
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 420, mx: 'auto', borderRadius: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField label="Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={!!errors.name && touched.name} helperText={touched.name && errors.name} fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={!!errors.phone && touched.phone} helperText={touched.phone && errors.phone} fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={!!errors.email && touched.email} helperText={touched.email && errors.email} fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Driver's License" name="license" value={values.license} onChange={handleChange} onBlur={handleBlur} error={!!errors.license && touched.license} helperText={touched.license && errors.license} fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Start Date" name="startDate" type="date" value={values.startDate} onChange={handleChange} onBlur={handleBlur} error={!!errors.startDate && touched.startDate} helperText={touched.startDate && errors.startDate} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={12}><TextField label="Days" name="days" value={values.days} onChange={handleChange} onBlur={handleBlur} error={!!errors.days && touched.days} helperText={touched.days && errors.days} fullWidth /></Grid>
        </Grid>
        {isValid && (
          <Typography sx={{ mt: 2, fontWeight: 600, color: '#1976d2' }}>Total Price: ${total}</Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={!isValid} sx={{ fontWeight: 600, px: 4 }}>Submit</Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ fontWeight: 600, px: 4 }}>Cancel</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ReservationForm; 