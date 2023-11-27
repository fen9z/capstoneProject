// EditUserModal.js
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditUserModal = ({
  showModal,
  handleCloseModal,
  editingUser,
  handleCancelEdit,
  handleSaveChanges,
  handleInputChange, // 添加此行
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveChanges}>
          {/* 编辑用户的表单输入 */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={editingUser.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Form.Group>
          {/* 其他字段的 Form.Group ... */}
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
