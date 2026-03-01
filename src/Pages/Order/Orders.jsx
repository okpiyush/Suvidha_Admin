import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';
import ConfirmationModal from '../../Components/Modals/confirmationModal';
import axios from 'axios';

import { API_BASE_URL } from '../../config';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease-out;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TableCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 1rem 1.5rem;
    background: var(--bg-main);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
    color: var(--text-main);
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tr:hover td {
    background: var(--bg-main);
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'pending': return '#fff7ed';
      case 'approved': return '#ecfdf5';
      case 'shipped': return '#eff6ff';
      default: return 'var(--bg-main)';
    }
  }};
  color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'shipped': return '#3b82f6';
      default: return 'var(--text-muted)';
    }
  }};
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  margin-right: 0.5rem;
  border: none;
  cursor: pointer;
  background: ${props => props.variant === 'danger' ? '#fee2e2' : 'var(--primary-light)'};
  color: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--primary)'};
  transition: var(--transition);

  &:hover {
    background: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--primary)'};
    color: white;
  }
`;

const Orders = () => {
  const url = `${API_BASE_URL}/order/`;
  const { loginData } = useContext(LoginContext);
  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchedData = useHook(url, loginData?.accessToken);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
      setLoading(false);
    }
  }, [fetchedData]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/order/${itemToDelete._id}`, {
        headers: { "token": `Bearer ${loginData.accessToken}` }
      });
      setData(data.filter(item => item._id !== itemToDelete._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/order/${orderId}`,
        { status: newStatus },
        { headers: { "token": `Bearer ${loginData.accessToken}` } }
      );
      setData(data.map(item => item._id === orderId ? { ...item, status: newStatus } : item));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <PageHeader>
        <h1 className="page-title">Order Fulfillment</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" style={{ background: '#fee2e2', color: 'var(--danger)' }}>
            Reject All
          </button>
          <button className="btn btn-primary">
            Accept All
          </button>
        </div>
      </PageHeader>

      <TableCard>
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Status</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>#{item._id?.substring(0, 8)}</td>
                <td>{item.userId?.substring(0, 8)}...</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{item.amount}</td>
                <td>{item.address}</td>
                <td>
                  <StatusBadge status={item.status}>{item.status}</StatusBadge>
                </td>
                <td style={{ fontWeight: 600 }}>{item.paymentMethod || 'COD'}</td>
                <td>
                  <Link to={`/order/${item._id}`}>
                    <ActionBtn title="View Details"><i className='bx bx-show'></i></ActionBtn>
                  </Link>
                  <ActionBtn
                    title="Approve"
                    onClick={() => handleStatusChange(item._id, 'approved')}
                    style={{ background: '#ecfdf5', color: '#10b981' }}
                  >
                    <i className='bx bx-check'></i>
                  </ActionBtn>
                  <ActionBtn
                    title="Ship"
                    onClick={() => handleStatusChange(item._id, 'shipped')}
                    style={{ background: '#eff6ff', color: '#3b82f6' }}
                  >
                    <i className='bx bx-package'></i>
                  </ActionBtn>
                  <ActionBtn variant="danger" onClick={() => handleDeleteClick(item)}>
                    <i className='bx bx-trash'></i>
                  </ActionBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableCard>

      {showDeleteModal && (
        <ConfirmationModal
          item={itemToDelete}
          onDelete={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </PageContainer>
  );
};

export default Orders;
