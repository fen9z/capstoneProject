// EditProductModal.js
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditProductModal = ({
  showModal,
  handleCloseModal,
  editingProduct,
  handleCancelEdit,
  handleSaveChanges,
  handleInputChange,
  isCreatingProduct, // add new product
}) => {
  // got product AuthContext
  const { user } = useAuthContext();
  const [error, setError] = useState('');
  // save changes
  const handleSaveChangesLocal = async () => {
    try {
      // crate new product object / update product object
      const formData = {
        itemId: editingProduct.itemId,
        name: editingProduct.name,
        image: editingProduct.image,
        price: editingProduct.price,
        storageNumber: editingProduct.storageNumber,
        category: editingProduct.category,
        storePlace: editingProduct.storePlace,
        realUrl: editingProduct.realUrl,
        description: editingProduct.description,
      };

      // send PATCH request to server
      const response = isCreatingProduct
        ? await fetch('/api/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(formData),
          })
        : await fetch(`/api/product/${editingProduct._id}`, {
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
      console.error('Error updating Product:', error);
      setError(error);
    }
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isCreatingProduct ? 'Create Product' : 'Edit Product'}
        </Modal.Title>{' '}
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-3">
          <Form.Group controlId="formItemId">
            <Form.Label>ItemId</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter itemId"
              value={editingProduct.itemId}
              onChange={(e) => handleInputChange('itemId', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={editingProduct.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Group>

          {/* create product / editingProduct */}
          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={editingProduct.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={editingProduct.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Number in store</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter storageNumber"
              value={editingProduct.storageNumber}
              onChange={(e) =>
                handleInputChange('storageNumber', e.target.value)
              }
            />
          </Form.Group>
          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={editingProduct.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option>select category</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="furniture">Furniture</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formStorePlace" className="mb-3">
            <Form.Label>StorePlace</Form.Label>
            <Form.Select
              aria-label="Default storePlace"
              value={editingProduct.storePlace}
              onChange={(e) => handleInputChange('storePlace', e.target.value)}
            >
              <option>select store Place</option>
              <option value="Waterloo">Waterloo</option>
              <option value="Kitchener">Kitchener</option>
              <option value="Cambridge">Cambridge</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formRealUrl" className="mb-3">
            <Form.Label>RealUrl</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter realUrl"
              value={editingProduct.realUrl}
              onChange={(e) => handleInputChange('realUrl', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={
                editingProduct.description ? editingProduct.description : ''
              }
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Form.Group>

          {/* other Form.Group ... */}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* button in Modal.Footer and align center */}
        <Button variant="secondary" onClick={handleCancelEdit} className="mb-3">
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChangesLocal}
          className="mb-3"
        >
          {isCreatingProduct ? 'Create Product' : 'Save Changes'}{' '}
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
