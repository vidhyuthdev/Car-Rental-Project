import { useState, useEffect } from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper, Button, Typography, TablePagination} from '@mui/material';
import useVerifyToken from '../../Hooks/useVerifyToken';
import toast from 'react-hot-toast';
import api from "../../api"
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

const navigate=useNavigate();
const getBookings=async()=>{
  const t=localStorage.getItem('token');
  try {
    const response=await api.post('/booking/get-bookings',{token:t});   
    let arr=response.data.bookings;
    arr.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    setBookings(arr);
    console.log(response.data.bookings);
    
  } 
  catch (error) {
    if (error?.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      navigate('/auth');
    } else {
      toast.error(error?.response?.data?.msg || "Failed to fetch bookings");
    }
  }       



}
  
  useEffect(() => {
          
          console.log('Success');
          
          getBookings();

          
      }, []);
      const handleCancelBooking = async (id) => {
        try {
          const token = localStorage.getItem('token');
          const response = await api.post('/booking/cancel', {
            id: id,
            token: token 
          });         
          toast.success(`Booking ${id} cancelled successfully`);
          getBookings();
          
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            navigate('/auth');
          }
          else
          toast.error('Failed to cancel the booking. Please try again.');
        }
      };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Bookings
      </Typography>
      <TableContainer className='mt-5'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Car Model</TableCell>
              <TableCell>Reg No</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Booking Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell>{booking.Car.model}</TableCell>
                  <TableCell>{booking.Car.registrationNumber}</TableCell>
                  <TableCell>{booking.startDate}</TableCell>
                  <TableCell>{booking.endDate}</TableCell>
                  <TableCell>₹{booking.bookingValue}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                  {new Date(booking.startDate) > new Date() && booking.status !== 'Cancelled' && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleCancelBooking(booking.bookingId)}
                      >
                        Cancel
                      </Button>
                    )}

                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={bookings.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default MyBookings;


