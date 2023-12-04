// Product.js
import React, { useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const Product = () => {
  // get the search term from the URL
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <SearchBar searchTerm={searchTerm} />
      <Filter />
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        {/* give the search term to SearchBar component */}
        <Col md={9}>
          <Routes>
            {/* give the search term to ProductList component */}
            <Route
              path="/"
              element={
                <ProductList
                  category="all"
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
            <Route
              path="laptop"
              element={
                <ProductList
                  category="laptop"
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
            <Route
              path="mobile"
              element={
                <ProductList
                  category="mobile"
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
            <Route
              path="furniture"
              element={
                <ProductList
                  category="furniture"
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
          </Routes>
        </Col>
      </Row>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <h4>Product held successfully!</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Product;
