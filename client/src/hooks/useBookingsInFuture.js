import { useEffect, useState } from 'react';

const useBookingsInFuture = () => {
  // console.log(token);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/bookingsInFuture', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const futureBookings = await response.json();
        setBookings(futureBookings);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchBookings();
  }, []);

  // return user details
  return bookings;
};

export default useBookingsInFuture;
