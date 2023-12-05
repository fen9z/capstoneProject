// EditUserModal.js
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditUserModal = ({
  showModal,
  handleCloseModal,
  editingUser,
  handleCancelEdit,
  handleSaveChanges,
  handleInputChange,
}) => {
  console.log('editingUser', editingUser);
  // got user AuthContext
  const { user } = useAuthContext();
  // save changes
  const handleSaveChangesLocal = async () => {
    try {
      // crate new user object
      const updatedUser = {
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        address: editingUser.address,
        postalCode: editingUser.postalCode,
        isAdmin: editingUser.isAdmin,
        // other fields ...
      };

      // send PATCH request to server
      const response = await fetch(`/api/user/${editingUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        // when save changes is successful close modal
        handleCloseModal();
        // transfer data to parent component
        handleSaveChanges(data);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-3">
          {/* editingUser */}
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={editingUser.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={editingUser.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={editingUser.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPostalCode" className="mb-3">
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={editingUser.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
            />
          </Form.Group>
          {/* // pay attention to this Form.Group checkbox not use value,use checked */}
          <Form.Group controlId="formIsAdmin" className="mb-3">
            <Form.Check
              label="IsAdmin"
              type="checkbox"
              checked={editingUser.isAdmin}
              onChange={(e) => handleInputChange('isAdmin', e.target.checked)}
            />
          </Form.Group>

          {/* other Form.Group ... */}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* 将按钮放在 Modal.Footer 内并使其居中显示 */}
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
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
