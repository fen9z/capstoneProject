// admin\Hold\Holds.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import EditHoldModal from './EditHoldModal';
const Holds = () => {
  const [holds, setHolds] = useState([]);
  const [editingHold, setEditingHold] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
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

  // get all holds
  useEffect(() => {
    const fetchHolds = async () => {
      try {
        let apiUrl = '/api/hold/allHolds';

        // if there is a filter term, add it to the API URL
        if (debouncedFilterTerm) {
          apiUrl += `?filter=${debouncedFilterTerm}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setHolds(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchHolds();
  }, [debouncedFilterTerm]); // when filterTerm changes, fetch holds again

  // dealing with edit
  const handleEditHold = (hold) => {
    setEditingHold(hold);
    setShowModal(true);
  };

  // dealing with canceling editing
  const handleCancelEdit = () => {
    setEditingHold(null);
    setShowModal(false);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancelEdit();
  };

  // Handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const holdsPerPage = 10;

  // Calculate the indexes for slicing the users array based on the current page
  const indexOfLastHold = currentPage * holdsPerPage;
  const indexOfFirstHold = indexOfLastHold - holdsPerPage;
  const currentHolds = holds.slice(indexOfFirstHold, indexOfLastHold);

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(holds.length / holdsPerPage); i++) {
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
          disabled={currentPage === Math.ceil(holds.length / holdsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>
    );
  };

  // dealing with save changes
  const handleSaveChanges = async (holdData) => {
    // update the hold in the holds array
    holdData.product = holdData.productId;
    holdData.user = holdData.userId;
    try {
      const updateHolds = holds.map((hold) =>
        hold._id === holdData._id ? holdData : hold
      );
      console.log('更新完成后', updateHolds);
      setHolds(updateHolds);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating hold:', error);
    }
  };

  // dealing with input field changes
  const handleInputChange = (field, value) => {
    // add logic to handle input field changes
    // update the editingHold state with the new value
    setEditingHold((prevHold) => ({
      ...prevHold,
      [field]: value,
    }));
  };

  // reader holds
  const renderUsers = () => {
    return (
      <Table
        striped
        bordered
        hover
        style={{ fontSize: '14px', textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>ItemId</th>
            <th>Product</th>
            <th>Is Completed</th>
            <th>Is Cancel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentHolds.map((hold) => (
            <tr key={hold._id}>
              <td>{hold.user.email}</td>
              <td>{hold.user.firstName + ' ' + hold.user.lastName}</td>
              <td>{hold.product.itemId}</td>
              <td>{hold.product.name.slice(0, 70)}</td>
              <td>{hold.isCompleted ? 'Yes' : 'No'}</td>
              <td>{hold.isCancelled ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEditHold(hold)}
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
      <h2 style={{ textAlign: 'center' }}>Holds</h2>
      <div style={{ display: 'flex', alignItems: 'center' }} className="mb-3">
        <input
          type="text"
          placeholder="filter holds with email or itemId..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          style={{ fontSize: '14px', padding: '5px' }}
        />
      </div>
      {editingHold ? (
        // EditHoldModal
        <EditHoldModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          editingHold={editingHold}
          handleCancelEdit={handleCancelEdit}
          handleSaveChanges={handleSaveChanges}
          handleInputChange={handleInputChange}
        />
      ) : holds.length === 0 ? (
        <p>No holds found.</p>
      ) : (
        // holds list
        <div>
          {renderUsers()}
          {renderPagination()} {/* Add this line to render the pagination */}
        </div>
      )}
    </div>
  );
};

export default Holds;
