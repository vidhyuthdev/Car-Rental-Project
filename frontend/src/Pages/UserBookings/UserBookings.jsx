// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useVerifyToken from '../../Hooks/useVerifyToken';
// import toast from 'react-hot-toast';
// const UserBookings = () => {
//   const navigate = useNavigate();
//     const { verifyToken} = useVerifyToken();

//     useEffect(() => {
//       const checkToken = async () => {
//           const {response,flag}=await verifyToken();
                           
//           if(!flag)
//           {
//             toast.error("Please Log In")
//             navigate('/auth')         
//           }
//       };
//       checkToken();
//   }, []);



//   return (
//       <div>
        
//       </div>
//   )
// }

// export default UserBookings
import React, { useState, useEffect } from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper, Button, Typography, TablePagination} from '@mui/material';
import useVerifyToken from '../../Hooks/useVerifyToken';
import toast from 'react-hot-toast';

const dummyBookings = Array.from({ length: 27 }).map((_, i) => ({
  id: i + 1,
  carModel: `Car Model ${i + 1}`,
  regNo: `KA-01-XX-${1000 + i}`,
  startDate: `2025-04-${(i % 28) + 1}`,
  endDate: `2025-05-${(i % 28) + 1}`,
  bookingValue: 2500 + i * 100,
  status: i % 2 === 0 ? 'Approved' : 'Pending',
}));

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { verifyToken} = useVerifyToken();

  
  useEffect(() => {
          const checkToken = async () => {
              const {response,flag}=await verifyToken();
                               
              if(!flag)
              {
                toast.error("Please Log In")
                navigate('/auth')         
              }
          };
          
          console.log('Success');
          //API
          setBookings(dummyBookings);
      }, []);

  const handleCancelBooking = (id) => {
    // TODO: Make API call to cancel booking
    alert(`Cancel booking ${id}`);
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
                <TableRow key={booking.id}>
                  <TableCell>{booking.carModel}</TableCell>
                  <TableCell>{booking.regNo}</TableCell>
                  <TableCell>{booking.startDate}</TableCell>
                  <TableCell>{booking.endDate}</TableCell>
                  <TableCell>₹{booking.bookingValue}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
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
