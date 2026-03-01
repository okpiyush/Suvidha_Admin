import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';
import { useHook } from '../../Hooks/useHook';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background: ${props => props.bg || 'var(--primary-light)'};
    color: ${props => props.color || 'var(--primary)'};
  }

  .content {
    .label {
      font-size: 0.875rem;
      color: var(--text-muted);
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-main);
    }
  }
`;

const WelcomeHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-muted);
  }
`;

const Summary = () => {
    const { loginData } = useContext(LoginContext);

    // Fetch individual stats
    const usersData = useHook("http://localhost:5005/api/users", loginData?.accessToken);
    const productsData = useHook("http://localhost:5005/api/products/", loginData?.accessToken);
    const ordersData = useHook("http://localhost:5005/api/order/", loginData?.accessToken);

    const stats = [
        {
            label: 'Total Users',
            value: usersData ? usersData.length : '...',
            icon: 'bx bxs-group',
            bg: '#eff6ff',
            color: '#3b82f6'
        },
        {
            label: 'Active Products',
            value: productsData ? productsData.length : '...',
            icon: 'bx bxs-box',
            bg: '#fdf2f8',
            color: '#ec4899'
        },
        {
            label: 'Total Orders',
            value: ordersData ? ordersData.length : '...',
            icon: 'bx bxs-shopping-bag',
            bg: '#ecfdf5',
            color: '#10b981'
        },
        {
            label: 'Pending Requests',
            value: '12', // Mocked as requested feature cleanup/refinement
            icon: 'bx bxs-hourglass-bottom',
            bg: '#fff7ed',
            color: '#f59e0b'
        }
    ];

    return (
        <>
            <WelcomeHeader>
                <h2>Welcome back, {loginData?.username || 'Admin'}</h2>
                <p>Here is what's happening with your business today.</p>
            </WelcomeHeader>

            <StatsGrid>
                {stats.map((stat, index) => (
                    <StatCard key={index} bg={stat.bg} color={stat.color}>
                        <div className="icon">
                            <i className={stat.icon}></i>
                        </div>
                        <div className="content">
                            <div className="label">{stat.label}</div>
                            <div className="value">{stat.value}</div>
                        </div>
                    </StatCard>
                ))}
            </StatsGrid>
        </>
    );
};

export default Summary;