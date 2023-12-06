// Users.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import EditUserModal from './EditUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false); // added state for creating user
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

  // get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl = '/api/user';

        // 如果有过滤条件，添加到 API 地址中
        if (debouncedFilterTerm) {
          apiUrl += `?filter=${debouncedFilterTerm}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [debouncedFilterTerm]); // when the filter term changes

  // dealing with editing
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // dealing with canceling editing
  const handleCancelEdit = () => {
    setEditingUser(null);
    setShowModal(false);
    setIsCreatingUser(false); // ensure that isCreatingUser is set to false
  };

  // dealing with creating
  const handleCreateUser = () => {
    setIsCreatingUser(true); // set isCreatingUser to true for creating user

    // set a empty user object to be edited transfered to EditUserModal
    setEditingUser({
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
  // 处理打开模态框
  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancelEdit();
  };

  // Handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Calculate the indexes for slicing the users array based on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
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
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>
    );
  };

  // save changes
  const handleSaveChanges = async (userData) => {
    // deal with creating user or updating user
    if (isCreatingUser) {
      try {
        setUsers([userData, ...users]);
        handleCloseModal();
      } catch (error) {
        console.error('Error creating user:', error);
      }
      // change the state of isCreatingUser to false
      setIsCreatingUser(false);
    } else {
      try {
        const updatedUsers = users.map((user) =>
          user._id === userData._id ? userData : user
        );
        setUsers(updatedUsers);
        handleCloseModal();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // dealing with input field changes
  const handleInputChange = (field, value) => {
    // add logic to handle input field changes
    // update the editingUser state with the new value
    setEditingUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // reader users table
  const renderUsers = () => {
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
            <th>Email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Is Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.postalCode}</td>
              <td>{user.isAdmin ? <i class="fa-solid fa-check"></i> : 'No'}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEditUser(user)}
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
      <h2 style={{ textAlign: 'center' }}>Users</h2>
      <div style={{ display: 'flex', alignItems: 'center' }} className="mb-3">
        <Button
          variant="success"
          size="sm"
          onClick={handleCreateUser}
          style={{
            maxWidth: '150px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <i className="fas fa-plus"></i> Add User
        </Button>
        <input
          type="text"
          placeholder="filter users with email address firstName..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          style={{ marginLeft: '10px', fontSize: '14px', padding: '5px' }}
        />
      </div>
      {editingUser ? (
        // EditUserModal
        <EditUserModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          editingUser={editingUser}
          handleCancelEdit={handleCancelEdit}
          handleSaveChanges={handleSaveChanges} // 确保这个函数被传递
          handleInputChange={handleInputChange} // 如果有的话，确保这个函数也被传递
          isCreatingUser={isCreatingUser} // 新添加的标志，表示是否在创建用户
        />
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        // 用户列表
        <div>
          {renderUsers()}
          {renderPagination()} {/* Add this line to render the pagination */}
        </div>
      )}
    </div>
  );
};

export default Users;
