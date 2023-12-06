// admin\Booking\Bookings.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import EditBookingModal from './EditBookingModal';
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [debouncedFilterTerm, setDebouncedFilterTerm] = useState(filterTerm);

  // set delay search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilterTerm(filterTerm);
    }, 500); // debounce time in milliseconds

    return () => {
      clearTimeout(timeoutId); // clear timeout when component unmounts
    };
  }, [filterTerm]);

  // get all Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let apiUrl = '/api/bookings/allBookings';

        // if there is a filter term, add it to the API URL
        if (debouncedFilterTerm) {
          apiUrl += `?filter=${debouncedFilterTerm}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchBookings();
  }, [debouncedFilterTerm]); // when filterTerm changes, fetch Bookings again

  // dealing with edit
  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setShowModal(true);
  };

  // dealing with canceling editing
  const handleCancelEdit = () => {
    setEditingBooking(null);
    setShowModal(false);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancelEdit();
  };

  // Handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  // Calculate the indexes for slicing the users array based on the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bookings.length / bookingsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination className="justify-content-center">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={
            currentPage === Math.ceil(bookings.length / bookingsPerPage)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>
    );
  };

  // dealing with save changes
  const handleSaveChanges = async (bookingData) => {
    // update the hold in the Bookings array
    try {
      const updateBookings = bookings.map((booking) =>
        booking._id === bookingData._id ? bookingData : booking
      );
      setBookings(updateBookings);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating hold:', error);
    }
  };

  // dealing with input field changes
  const handleInputChange = (field, value) => {
    // add logic to handle input field changes
    // update the editingHold state with the new value
    setEditingBooking((prevBooking) => ({
      ...prevBooking,
      [field]: value,
    }));
  };

  // reader Bookings
  const renderBookings = () => {
    return (
      <Table
        striped
        bordered
        hover
        style={{ fontSize: '14px', textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>IsCompleted</th>
            <th>IsCancelled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.email}</td>
              <td>{booking.firstName + ' ' + booking.lastName}</td>
              <td>{booking.phone}</td>
              <td>{booking.service}</td>
              <td>{booking.date.slice(0, 10)}</td>
              <td>{booking.time}</td>
              <td>{booking.isCompleted ? 'Yes' : 'No'}</td>
              <td>{booking.isCancelled ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEditBooking(booking)}
                >
                  <i className="fas fa-edit"></i> Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Bookings</h2>
      <div style={{ display: 'flex', alignItems: 'center' }} className="mb-3">
        <input
          type="text"
          placeholder="filter Bookings with email, name or phone..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          style={{ fontSize: '14px', padding: '5px' }}
        />
      </div>
      {editingBooking ? (
        // EditBookingModal
        <EditBookingModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          editingBooking={editingBooking}
          handleCancelEdit={handleCancelEdit}
          handleSaveChanges={handleSaveChanges}
          handleInputChange={handleInputChange}
        />
      ) : bookings.length === 0 ? (
        <p>No Bookings found.</p>
      ) : (
        // Bookings list
        <div>
          {renderBookings()}
          {renderPagination()} {/* Add this line to render the pagination */}
        </div>
      )}
    </div>
  );
};

export default Bookings;
