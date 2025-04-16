import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import api from '../../api';

const HomePage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [activeBookings, setActiveBookings] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            const t = localStorage.getItem('token');
            try {
                const response = await api.post('/booking/get-bookings', { token: t });
                let arr = response.data.bookings;

                // Sort descending by startDate
                arr.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setBookings(arr);

                // Today's date
                const today = new Date();

                // Active Bookings: today in range
                const active = arr.filter(b => {
                    const start = new Date(b.startDate);
                    const end = new Date(b.endDate);
                    return today >= start && today <= end;
                });

                // Recent Bookings: non-active, most recent 3
                const recent = arr.filter(b => {
                    const start = new Date(b.startDate);
                    const end = new Date(b.endDate);
                    return !(today >= start && today <= end);
                }).slice(0, 3);

                setActiveBookings(active);
                setRecentBookings(recent);
            } catch (error) {
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
        };

        getBookings();
    }, []);

    return (
        <div className="min-h-screen p-8 flex flex-col gap-6 bg-gray-100">

            {/* Welcome Section */}
            <div className="bg-gradient-to-r to-[#7e9bca] from-[#3A5A98] text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
                <div>
                    <h1 className="text-3xl font-bold">{`Welcome, ${localStorage.getItem('name')}`}</h1>
                    <p className="text-sm text-gray-200">Ready to hit the road? Find your perfect car now.</p>
                </div>
            </div>

            {/* Active Booking */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Active Booking</h2>
                {activeBookings.length > 0 ? (
                    activeBookings.map((booking, idx) => (
                        <div key={idx} className="p-4 border rounded-lg bg-gray-50 mb-2">
                            <p><strong>Car:</strong> {booking.Car?.model}</p>
                            <p><strong>From:</strong> {booking.startDate}</p>
                            <p><strong>To:</strong> {booking.endDate}</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                        <p className="text-gray-700">No active bookings</p>
                    </div>
                )}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
                <div className="flex flex-col gap-3">
                    {recentBookings.length > 0 ? (
                        recentBookings.map((booking, idx) => (
                            <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                                <p><strong>Car:</strong> {booking.Car?.model}</p>
                                <p><strong>From:</strong> {booking.startDate}</p>
                                <p><strong>To:</strong> {booking.endDate}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No recent bookings</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default HomePage;
