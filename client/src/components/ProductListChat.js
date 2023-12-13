import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Card, ListGroup } from 'react-bootstrap';

const ProductListChat = ({ category = 'all', searchTerm }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    // get products from backend
    const fetchProducts = async () => {
      try {
        // api call to get products
        const response = await fetch(
          `/api/product/threeNewProducts/?category=${category}&search=${searchTerm}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          console.error('get products error:', data.message);
        }
      } catch (error) {
        console.error('get products error:', error.message);
      }
    };

    fetchProducts();
  }, [category, searchTerm, user.token]); // based on category and searchTerm

  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">the newest 3 products</h4>
      </Card.Header>
      <ListGroup variant="flush" className="mb-3">
        {products &&
          products.map((product) => (
            <ListGroup.Item key={product._id}>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-1">{product.name}</h4>
                  <p className="mb-1">
                    <strong>Item ID</strong>: {product.itemId}
                    <strong> Category</strong>: {product.category}
                  </p>
                  <p className="mb-1">
                    <strong>StorePlace</strong>: {product.storePlace}
                  </p>
                  <p className="mb-1">
                    <strong>Price</strong>: ${product.price.toFixed(2)}
                  </p>
                  <p className="mb-1">
                    <strong>storage</strong>: {product.storageNumber}
                  </p>
                  <p></p>
                  {/* Add more product details as needed */}
                </div>
                <div className="d-flex flex-column align-items-center">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  )}

                  <br />
                  {/* View Details link */}
                  <a
                    href={product.realUrl}
                    className="text-decoration-none mt-2"
                    target={'_blank'}
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default ProductListChat;
