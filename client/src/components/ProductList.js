import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ category, searchTerm, onShowModal }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleHold = async (productId) => {
    try {
      //  api call to hold product
      const response = await fetch(`/api/hold/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Product held:', data);
        // refresh products or do something else
        // redirect to another page or show success message
        // 2 seconds delay go to the hold page
        onShowModal();
        setTimeout(() => {
          navigate('/hold');
        }, 1500);
      } else {
        console.error('Hold product error:', data.message);
      }
    } catch (error) {
      console.error('Hold product error:', error.message);
    }
  };

  useEffect(() => {
    // get products from backend
    const fetchProducts = async () => {
      try {
        // api call to get products
        const response = await fetch(
          `/api/product/?category=${category}&search=${searchTerm}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        console.log('productList', data);
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
        <h3 className="mb-0">{category} search results</h3>
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
                    <strong> holded</strong>: {product.holdedNumber}
                  </p>
                  <p className="mb-1">
                    <strong>Description</strong>: {product.description}
                  </p>
                  <p></p>
                  {/* Add more product details as needed */}
                </div>
                <div className="d-flex flex-column align-items-center">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  )}
                  {/* HOLD button */}
                  <Button
                    variant="warning"
                    className="mt-2"
                    onClick={() => handleHold(product._id)}
                  >
                    HOLD
                  </Button>
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

export default ProductList;
