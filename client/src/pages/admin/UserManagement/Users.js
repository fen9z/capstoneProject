// Users.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import EditUserModal from './EditUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');

  // 获取用户列表
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl = '/api/user';

        // 如果有过滤条件，添加到 API 地址中
        if (filterTerm) {
          apiUrl += `?filter=${filterTerm}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filterTerm]); // 当 filterTerm 变化时重新获取用户列表

  // 处理编辑用户
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // 处理取消编辑
  const handleCancelEdit = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  // 处理打开模态框
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setShowModal(false);
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

  // 处理保存更改
  const handleSaveChanges = async () => {
    // 在这里添加处理保存更改的逻辑
    // 例如，可以向服务器发送请求以保存更改

    // 保存完成后关闭模态框
    handleCloseModal();
  };

  // 处理输入字段的变化
  const handleInputChange = (field, value) => {
    // 在这里添加处理输入字段变化的逻辑
    // 可以更新当前编辑用户的相应字段
    setEditingUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // 渲染用户列表
  const renderUsers = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.postalCode}</td>
              <td>
                <Button variant="info" onClick={() => handleEditUser(user)}>
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
      <h2>Users</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="success"
          onClick={handleOpenModal}
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
          placeholder="filter users..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          style={{ marginLeft: '10px' }}
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
