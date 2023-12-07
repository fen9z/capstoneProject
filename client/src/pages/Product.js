// Product.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const Product = () => {
  // get the search term from the URL
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('all');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // excute when the component is mounted or updated
    setSearchTerm(new URLSearchParams(location.search).get('search') || '');
    setFilterTerm(
      new URLSearchParams(location.search).get('category') || 'all'
    );
    return () => {
      // clear up
    };
  }, [location.search]);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <SearchBar
        searchTerm={searchTerm}
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
        setSearchTerm={setSearchTerm}
      />
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
                  category={filterTerm}
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
            <Route
              path="laptop"
              element={
                <ProductList
                  category={filterTerm}
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
            <Route
              path="mobile"
              element={
                <ProductList
                  category={filterTerm}
                  searchTerm={searchTerm}
                  onShowModal={handleShowModal}
                />
              }
            />
            <Route
              path="furniture"
              element={
                <ProductList
                  category={filterTerm}
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
          <i class="fa-solid fa-circle-check"></i>
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
