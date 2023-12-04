// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '20%', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <h2>Categories</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/products/laptop">Laptops</Link>
        </li>
        <li>
          <Link to="/products/mobile">Mobiles</Link>
        </li>
        <li>
          <Link to="/products/furniture">Furniture</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
