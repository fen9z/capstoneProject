import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useFetchUserDetails from '../hooks/useFetchUserDetails';
import BookingCalendar from '../components/bookingCalendar';
import '../style/styles.css';

const Booking = () => {
  const { user } = useAuthContext();
  const userDetails = useFetchUserDetails(user.token);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  // Update form fields with user information when user changes
  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || '');
      setLastName(userDetails.lastName || '');
      setEmail(userDetails.email || '');
      // ... (populate other fields as needed)
    }
  }, [userDetails]);

  // call bookAppointment function submitting form data
  const bookAppointment = async (
    firstName,
    lastName,
    email,
    phone,
    service,
    date,
    time
  ) => {
    try {
      setError(null);
      setIsLoading(true);
      // create the appointment data
      const appointmentData = {
        firstName,
        lastName,
        email,
        phone,
        service,
        date,
        time,
      };
      // console.log(user);
      // request to book appointment
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // add the token to the request,the token is in the user object from useAuthContext
        },
        body: JSON.stringify(appointmentData),
      });

      // get the response data
      const json = await response.json();

      if (response.ok) {
        // booking successful
        setSuccessMessage('Appointment booked successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        // booking failed
        console.error('Failed to book appointment:', json.error);
        setError(json.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // call bookAppointment function submitting form data
    bookAppointment(firstName, lastName, email, phone, service, date, time);

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setService('');
    setDate('');
    setTime('');
  };

  return (
    <Container
      className="d-flex  justify-content-start align-items-start p-4"
      style={{ width: '100%', height: '100vh' }}
    >
      <div className="p-4" style={{ width: '40%' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="form-control"
              placeholder="Enter Fname"
              style={{ border: '1px solid grey' }}
              required
            />
          </div>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-control "
              placeholder="Enter Lname"
              style={{ border: '1px solid grey' }}
              required
            />
          </div>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control "
              placeholder="Enter email"
              style={{ border: '1px solid grey' }}
              required
            />
          </div>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>Phone</label>
            <input
              type="text"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-control "
              placeholder="Enter phone"
              style={{ border: '1px solid grey' }}
              required
            />
          </div>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>Service</label>
            <select
              name="service"
              onChange={(e) => setService(e.target.value)}
              value={service}
              className="form-control inpt"
              style={{ border: '1px solid grey' }}
            >
              <option value="" style={{ color: 'grey' }}>
                Select service
              </option>
              <option value="mobile">Mobile</option>
              <option value="laptops">Laptop</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>Date</label>
            <input
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="form-control inpt"
              placeholder="select date"
              style={{ border: '1px solid grey' }}
              required
            />
          </div>
          <div className="mb-2">
            <label style={{ alignSelf: 'left' }}>Time</label>
            <input
              type="time"
              name="time"
              min="08:00"
              max="16:00"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              className="form-control inpt"
              placeholder="select time"
              style={{ border: '1px solid grey' }}
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" disabled={isLoading} className="btns">
              Book Appointment
            </button>
          </div>
          {successMessage && <div className="success">{successMessage}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <div style={{ width: '60%' }}>
        <BookingCalendar />
      </div>
    </Container>
  );
};

export default Booking;
