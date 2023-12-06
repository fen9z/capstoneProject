// EditBookingModal.js
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditBookingModal = ({
  showModal,
  handleCloseModal,
  editingBooking,
  handleCancelEdit,
  handleSaveChanges,
  handleInputChange,
}) => {
  // got user AuthContext
  const { user } = useAuthContext();
  const [error, setError] = useState('');
  // save changes
  const handleSaveChangesLocal = async () => {
    try {
      // crate new user object / update user object
      const formData = {
        phone: editingBooking.phone,
        service: editingBooking.service,
        time: editingBooking.time,
        isCancelled: editingBooking.isCancelled,
        isCompleted: editingBooking.isCompleted,
        messageToUser: editingBooking.messageToUser,
      };

      // send PATCH request to server
      const response = await fetch(`/api/bookings/${editingBooking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // when save changes is successful close modal
        handleCloseModal();
        // transfer data to parent component
        handleSaveChanges(data);
      } else {
        console.error('Failed to update user:', response.statusText);
        setError(response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error);
    }
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>{' '}
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-3">
          {/* create user / editingBooking */}
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Name</strong> : {editingBooking.firstName}{' '}
              {editingBooking.lastName}
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={editingBooking.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              value={editingBooking.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formService" className="mb-3">
            <Form.Label>Service</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={editingBooking.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
            >
              <option>select service</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="furniture">Furniture</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formTime" className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Select
              aria-label="08:00"
              value={editingBooking.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
            >
              <option>select time</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </Form.Select>
          </Form.Group>

          {/* // pay attention to this Form.Group checkbox not use value,use checked */}

          <Form.Group controlId="formIsCancelled" className="mb-3">
            <Form.Check
              label=" Is cancelled"
              type="checkbox"
              checked={editingBooking.isCancelled}
              onChange={(e) =>
                handleInputChange('isCancelled', e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group controlId="formIsCompleted" className="mb-3">
            <Form.Check
              label=" Is Completed"
              type="checkbox"
              checked={editingBooking.isCompleted}
              onChange={(e) =>
                handleInputChange('isCompleted', e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group controlId="formMessageToUser" className="mb-3">
            <Form.Label>Message To User</Form.Label>
            <Form.Control
              as="textarea"
              value={
                editingBooking.messageToUser ? editingBooking.messageToUser : ''
              }
              onChange={(e) =>
                handleInputChange('messageToUser', e.target.value)
              }
            />
          </Form.Group>

          {/* other Form.Group ... */}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* center buttons in modal */}
        <Button variant="secondary" onClick={handleCancelEdit} className="mb-3">
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChangesLocal}
          className="mb-3"
        >
          Save Changes
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookingModal;
