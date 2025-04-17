import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination
} from '@mui/material';
import api from '../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Approvals = () => {
  const [bookings, setBookings] = useState([]);
  const [completedBooking, setCompletedBooking] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [completedPage, setCompletedPage] = useState(0);
  const [completedRowsPerPage, setCompletedRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please Sign In")
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
  

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/admin/unapproved-bookings', { token });
      setBookings(res.data.bookings);
      setCompletedBooking(res.data.completedBooking);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        toast.error('Failed to fetch bookings');
        console.error(err);
      }
    }
  };
  useEffect(() => {
    const init = async () => {
      await verifyToken();  
      await fetchBookings();  
    };
    init();
  }, []);
  

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/admin/update-booking-status', {
        status: action === 'approve' ? 'Approved' : 'Rejected',
        token,
        id
      });
      toast.success(`Booking ${action === 'approve' ? 'approved' : 'rejected'}`);
      fetchBookings();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        toast.error('Failed to update booking status');
        console.error(err);
      }
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCompletedChangePage = (event, newPage) => setCompletedPage(newPage);
  const handleCompletedChangeRowsPerPage = (event) => {
    setCompletedRowsPerPage(parseInt(event.target.value, 10));
    setCompletedPage(0);
  };

  const paginatedData = bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const paginatedCompletedData = completedBooking.slice(completedPage * completedRowsPerPage, completedPage * completedRowsPerPage + completedRowsPerPage);

  return (
    <div className="p-3">
      {/* Heading for Pending Approvals */}
      <h2 style={{ marginTop: '20px', fontWeight: 'bold' }}>Pending Approval Bookings</h2>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Car Model</TableCell>
              <TableCell>Reg No</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell>{booking.User.name}</TableCell>
                <TableCell>{booking.Car.model}</TableCell>
                <TableCell>{booking.Car.registrationNumber}</TableCell>
                <TableCell>{booking.startDate}</TableCell>
                <TableCell>{booking.endDate}</TableCell>
                <TableCell>
                  <Button color="success" onClick={() => handleAction(booking.bookingId, 'approve')}>
                    Approve
                  </Button>
                  <Button color="error" onClick={() => handleAction(booking.bookingId, 'reject')}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={bookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Heading for Past Bookings */}
      <h2 style={{ marginTop: '40px', fontWeight: 'bold' }}>Past Bookings</h2>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Car Model</TableCell>
              <TableCell>Reg No</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCompletedData.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell>{booking.User.name}</TableCell>
                <TableCell>{booking.Car.model}</TableCell>
                <TableCell>{booking.Car.registrationNumber}</TableCell>
                <TableCell>{booking.startDate}</TableCell>
                <TableCell>{booking.endDate}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={completedBooking.length}
          rowsPerPage={completedRowsPerPage}
          page={completedPage}
          onPageChange={handleCompletedChangePage}
          onRowsPerPageChange={handleCompletedChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Approvals;
