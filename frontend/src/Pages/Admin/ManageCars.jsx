import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button,
  TextField, Grid, MenuItem, Typography, Card, CardContent, TablePagination
} from '@mui/material';
import api from '../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ManageCars = () => {
  const navigate = useNavigate();

  const [carList, setCarList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    model: '',
    location: '',
    registrationNumber: '',
    type: '',
    price: '',
    imageURL: ''
  });

  const [editData, setEditData] = useState({
    carId: null,
    imageURL: '',
    price: ''
  });

  const fetchCarData = async () => {
    const t = localStorage.getItem('token');
    try {
      const response = await api.post('/admin/get-car-details', { token: t });
      setCarList(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        toast.error('Failed to load cars');
      }
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please Sign In");
      navigate('/auth');
      return;
    }

    try {
      await api.post('/admin/auth/verify-token', { token });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        toast.error('Token verification failed');
      }
    }
  };

  const handleAddCar = async () => {
   
    const { model, location, registrationNumber, type, price, imageURL } = formData;
    if (!model || !location || !registrationNumber || !type || !price || !imageURL) {
      toast.error("Please fill all fields");
      return;
    }
    
    
    try {
      await api.post('/admin/add-car', {form:formData,token:localStorage.getItem('token')});
      toast.success("Car added successfully");
      setFormData({ model: '', location: '', registrationNumber: '', type: '', price: '', imageURL: '' });
      fetchCarData();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
        }
      else
      {
        toast.error(err?.response?.data?.msg || err.message || "Something went wrong");
       
      }
        

    }
  };

  const handleEditCar = async () => {
    const { carId, imageURL, price } = editData;
    if (!carId || !imageURL || !price||Number(price)<=0) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      await api.post('/admin/edit-car', { car:{id:carId, imageURL:imageURL, price:price},token:localStorage.getItem('token') });
      toast.success("Car details updated successfully");
      setEditData({ carId: null, imageURL: '', price: '' });
      fetchCarData();
    } catch (err) { 
      if (err.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/auth');
      }
      else
      toast.error("Failed to update car details");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const init = async () => {
      await verifyToken();
      await fetchCarData();
    };
    init();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Manage Cars
      </Typography>

      {/* Car Table */}
      <Paper sx={{ mb: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Model</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Registration No.</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Image URL</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.location}</TableCell>
                  <TableCell>{car.registrationNumber}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>
                    {editData.carId === car.id ? (
                      <TextField
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        variant="outlined"
                        fullWidth
                        type="number"
                      />
                    ) : (
                      `₹${car.price}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editData.carId === car.id ? (
                      <TextField
                        value={editData.imageURL}
                        onChange={(e) => setEditData({ ...editData, imageURL: e.target.value })}
                        variant="outlined"
                        fullWidth
                      />
                    ) : (
                      car.imageURL
                    )}
                  </TableCell>
                  <TableCell>
                    {editData.carId === car.id ? (
                      <Button onClick={handleEditCar} color="primary" variant="contained">
                        Save
                      </Button>
                    ) : (
                      <Button onClick={() => setEditData({ carId: car.id, price: car.price, imageURL: car.imageURL })} color="secondary">
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={carList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add New Car Form */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Car
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                variant="outlined"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Location"
                variant="outlined"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Bhopal', 'Visakhapatnam', 'Nagpur', 'Coimbatore'].map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Registration Number"
                variant="outlined"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Type"
                variant="outlined"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Price (₹)"
                variant="outlined"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                variant="outlined"
                value={formData.imageURL}
                onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleAddCar}>
                Add Car
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCars;
