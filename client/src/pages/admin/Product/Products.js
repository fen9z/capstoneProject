// products.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import EditProductModal from './EditProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [isCreatingProduct, setIsCreatingProduct] = useState(false); // added state for creating user
  const [debouncedFilterTerm, setDebouncedFilterTerm] = useState(filterTerm);

  // set delay search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilterTerm(filterTerm);
    }, 500); // debounce time in milliseconds

    return () => {
      clearTimeout(timeoutId); // clear timeout when component unmounts
    };
  }, [filterTerm]);

  // get all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let apiUrl = '/api/product/all/';

        // if there is a filter term, add it to the API URL
        if (debouncedFilterTerm) {
          apiUrl += `?filter=${debouncedFilterTerm}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [debouncedFilterTerm]); // when the filter term changes

  // dealing with editing
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // dealing with canceling editing
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowModal(false);
    setIsCreatingProduct(false); // ensure that isCreatingProduct is set to false
  };

  // dealing with creating
  const handleCreateProduct = () => {
    setIsCreatingProduct(true); // set isCreatingProduct to true for creating product

    // set a empty product object to be edited transfered to EditProductModal
    setEditingProduct({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      postalCode: '',
      isAdmin: false,
    });
    setShowModal(true);
  };

  // dealing with closing
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancelEdit();
  };

  // Handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Calculate the indexes for slicing the products array based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination className="justify-content-center">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>
    );
  };

  // save changes
  const handleSaveChanges = async (productData) => {
    // deal with creating product or updating product
    if (isCreatingProduct) {
      try {
        setProducts([productData, ...products]);
        handleCloseModal();
      } catch (error) {
        console.error('Error creating product:', error);
      }
      // change the state of isCreatingProduct to false
      setIsCreatingProduct(false);
    } else {
      try {
        const updatedProducts = products.map((product) =>
          product._id === productData._id ? productData : product
        );
        setProducts(updatedProducts);
        handleCloseModal();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  // dealing with input field changes
  const handleInputChange = (field, value) => {
    // add logic to handle input field changes
    // update the editingProduct state with the new value
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  // reader users table
  const renderProducts = () => {
    return (
      <Table
        striped
        bordered
        hover
        responsive
        style={{ fontSize: '14px', textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>itemId</th>
            <th>Img</th>
            <th>Name</th>
            <th>Category</th>
            <th>Pirce</th>
            <th>storePlace</th>
            <th>description</th>
            <th>Detail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.itemId}</td>
              <td>
                {<img src={product.image} alt={product.name} width="80"></img>}
              </td>
              <td>{product.name.slice(0, 50) + '...'}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.storePlace}</td>
              <td>{product.description.slice(0, 150) + '...'}</td>
              <td>
                {
                  <a href={product.realUrl} target="_blank" rel="noreferrer">
                    <i class="fa-solid fa-link"></i>Detail
                  </a>
                }
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                >
                  <i className="fas fa-edit"></i> Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Products</h2>
      <div style={{ display: 'flex', alignItems: 'center' }} className="mb-3">
        <Button
          variant="success"
          size="sm"
          onClick={handleCreateProduct}
          style={{
            maxWidth: '150px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <i className="fas fa-plus"></i> Add Product
        </Button>
        <input
          type="text"
          placeholder="filter products with name itemId description..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          style={{ marginLeft: '10px', fontSize: '14px', padding: '5px' }}
        />
      </div>
      {editingProduct ? (
        // EditProductModal
        <EditProductModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          editingProduct={editingProduct}
          handleCancelEdit={handleCancelEdit}
          handleSaveChanges={handleSaveChanges} // 确保这个函数被传递
          handleInputChange={handleInputChange} // 如果有的话，确保这个函数也被传递
          isCreatingProduct={isCreatingProduct} // 新添加的标志，表示是否在创建用户
        />
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        // 用户列表
        <div>
          {renderProducts()}
          {renderPagination()} {/* Add this line to render the pagination */}
        </div>
      )}
    </div>
  );
};

export default Products;
