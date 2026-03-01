import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHook } from "../../Hooks/useHook";
import { LoginContext } from '../../Context/LoginContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

const Container = styled.div`
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: var(--transition);

  &:hover {
    background: var(--bg-main);
  }

  .order-info {
    .order-id {
      font-weight: 600;
      color: var(--text-main);
      font-size: 0.875rem;
      font-family: monospace;
    }
    .amount {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--primary);
      margin-top: 0.25rem;
    }
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

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--bg-main);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: ${props => props.type === 'approve' ? 'var(--success)' : 'var(--danger)'};
    color: white;
  }
`;

const ViewAllButton = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-light);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const NewOrder = () => {
  const { loginData } = useContext(LoginContext);
  const url = "http://localhost:5005/api/order?new=true";
  const orders = useHook(url, loginData?.accessToken);

  const displayOrders = orders || [];

  return (
    <Container>
      <Header>
        <h3>New Orders</h3>
        <ViewAllButton to="/orders">View All</ViewAllButton>
      </Header>
      <List>
        {displayOrders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No new orders found.</p>
        ) : (
          displayOrders.map((item) => (
            <OrderItem key={item._id}>
              <div className="order-info">
                <div className="order-id">#{item._id?.substring(0, 8)}...</div>
                <div className="amount">${item.amount}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
                <ActionButtonGroup>
                  <IconButton type="reject" title="Cancel Order">
                    <i className='bx bx-x'></i>
                  </IconButton>
                  <IconButton type="approve" title="Process Order">
                    <i className='bx bx-check' ></i>
                  </IconButton>
                </ActionButtonGroup>
              </div>
            </OrderItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default NewOrder;