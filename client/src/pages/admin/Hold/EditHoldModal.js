// EditHoldModal.js
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditHoldModal = ({
  showModal,
  handleCloseModal,
  editingHold,
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
        isCancelled: editingHold.isCancelled,
        isCompleted: editingHold.isCompleted,
        messageToUser: editingHold.messageToUser,
      };

      // send PATCH request to server
      const response = await fetch(`/api/hold/${editingHold._id}`, {
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
        <Modal.Title>Edit Hold</Modal.Title>{' '}
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-3">
          {/* create user / editingHold */}
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>User: </strong>
              {editingHold.user.firstName + ' ' + editingHold.user.lastName}
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Product: </strong>
              {editingHold.product.name.slice(0, 70)}
            </Form.Label>
          </Form.Group>

          {/* // pay attention to this Form.Group checkbox not use value,use checked */}

          <Form.Group controlId="formIsCancelled" className="mb-3">
            <Form.Check
              label=" Is cancelled"
              type="checkbox"
              checked={editingHold.isCancelled}
              onChange={(e) =>
                handleInputChange('isCancelled', e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group controlId="formIsCompleted" className="mb-3">
            <Form.Check
              label=" Is Completed"
              type="checkbox"
              checked={editingHold.isCompleted}
              onChange={(e) =>
                handleInputChange('isCompleted', e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group controlId="formMessageToUser" className="mb-3">
            <Form.Label>Message To User</Form.Label>
            <Form.Control
              as="textarea"
              value={editingHold.messageToUser ? editingHold.messageToUser : ''}
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

export default EditHoldModal;
