// EditUserModal.js
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditUserModal = ({
  showModal,
  handleCloseModal,
  editingUser,
  handleCancelEdit,
  handleSaveChanges,
  handleInputChange,
  isCreatingUser, // new state for creating user
}) => {
  // got user AuthContext
  const { user } = useAuthContext();
  const [error, setError] = useState('');
  // save changes
  const handleSaveChangesLocal = async () => {
    try {
      // crate new user object / update user object
      const formData = isCreatingUser
        ? {
            email: editingUser.email,
            firstName: editingUser.firstName,
            lastName: editingUser.lastName,
            address: editingUser.address,
            postalCode: editingUser.postalCode,
            password: editingUser.password,
          }
        : {
            firstName: editingUser.firstName,
            lastName: editingUser.lastName,
            address: editingUser.address,
            postalCode: editingUser.postalCode,
            isAdmin: editingUser.isAdmin,
            // other fields ...
          };

      // send PATCH request to server
      const response = isCreatingUser
        ? await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(formData),
          })
        : await fetch(`/api/user/${editingUser._id}`, {
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
        <Modal.Title>
          {isCreatingUser ? 'Create User' : 'Edit User'}
        </Modal.Title>{' '}
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-3">
          {isCreatingUser && (
            <>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={editingUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={editingUser.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                />
              </Form.Group>
            </>
          )}
          {/* create user / editingUser */}
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
          {!isCreatingUser && (
            <Form.Group controlId="formIsAdmin" className="mb-3">
              <Form.Check
                label="IsAdmin"
                type="checkbox"
                checked={editingUser.isAdmin}
                onChange={(e) => handleInputChange('isAdmin', e.target.checked)}
              />
            </Form.Group>
          )}
          {/* other Form.Group ... */}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* button in Modal.Footer align center */}
        <Button variant="secondary" onClick={handleCancelEdit} className="mb-3">
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChangesLocal}
          className="mb-3"
        >
          {isCreatingUser ? 'Create User' : 'Save Changes'}{' '}
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
