// Product.js
import React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Container, Row, Col } from 'react-bootstrap';

const Product = () => {
  // get the search term from the URL
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

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
              element={<ProductList category="all" searchTerm={searchTerm} />}
            />
            <Route
              path="laptop"
              element={
                <ProductList category="laptop" searchTerm={searchTerm} />
              }
            />
            <Route
              path="mobile"
              element={
                <ProductList category="mobile" searchTerm={searchTerm} />
              }
            />
            <Route
              path="furniture"
              element={
                <ProductList category="furniture" searchTerm={searchTerm} />
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
