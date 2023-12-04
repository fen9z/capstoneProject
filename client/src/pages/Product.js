// Product.js
import React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

const Product = () => {
  // 获取 URL 中的搜索词
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  return (
    <div>
      {/* give the search term to SearchBar component */}
      <SearchBar searchTerm={searchTerm} />
      <Filter />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
          {/* give the search term to ProductList component */}
          <Route
            path="/"
            element={<ProductList category="all" searchTerm={searchTerm} />}
          />
          <Route
            path="laptop"
            element={<ProductList category="laptop" searchTerm={searchTerm} />}
          />
          <Route
            path="mobile"
            element={<ProductList category="mobile" searchTerm={searchTerm} />}
          />
          <Route
            path="furniture"
            element={
              <ProductList category="furniture" searchTerm={searchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Product;
