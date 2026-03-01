import React, { useContext } from 'react';

import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease-out;
`;

const TableCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }
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
    letter-spacing: 0.05em;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
    color: var(--text-main);
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: var(--bg-main);
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  i {
    color: var(--primary);
    font-size: 1.25rem;
  }
`;

const ActionBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  margin-right: 0.5rem;
  color: ${props => props.type === 'delete' ? 'var(--danger)' : 'var(--primary)'};
  background: ${props => props.type === 'delete' ? '#fee2e2' : 'var(--primary-light)'};
  transition: var(--transition);

  &:hover {
    background: ${props => props.type === 'delete' ? 'var(--danger)' : 'var(--primary)'};
    color: white;
  }
`;

export const Users = () => {
  const url = "http://localhost:5005/api/users";
  const { loginData } = useContext(LoginContext);
  const users = useHook(url, loginData?.accessToken);

  if (!users) return <Loading />;

  return (
    <PageContainer>
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
      </div>

      <TableCard>
        <TableHeader>
          <h2>All Registered Users</h2>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <UserAvatar>
                      {item.img ? <img src={item.img} alt={item.username} /> : <i className='bx bxs-user'></i>}
                    </UserAvatar>
                    <span style={{ fontWeight: 600 }}>{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.createdAt?.substring(0, 10)}</td>
                <td>
                  <ActionBtn to={`/users/${item._id}`} title="View Details">
                    <i className='bx bx-show'></i>
                  </ActionBtn>
                  <ActionBtn to="#" type="delete" title="Delete User">
                    <i className='bx bx-trash'></i>
                  </ActionBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableCard>
    </PageContainer>
  );
};

const UserProfileCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;

  .main-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: var(--shadow-md);
    margin-bottom: 2rem;
    overflow: hidden;
    background: var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: center;

    img { width: 100%; height: 100%; object-fit: cover; }
    i { font-size: 4rem; color: var(--primary); }
  }

  h2 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
  .email { color: var(--text-muted); font-size: 1.125rem; margin-bottom: 2rem; }

  .stats {
    display: flex;
    gap: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    justify-content: center;
    
    .stat {
      .label { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }
      .value { font-size: 1.25rem; font-weight: 700; color: var(--text-main); }
    }
  }
`;

export const User = () => {
  const { id } = useParams();
  const { loginData } = useContext(LoginContext);
  const url = `http://localhost:5005/api/users/find/${id}`;
  const user = useHook(url, loginData?.accessToken);

  if (!user) return <Loading />;

  return (
    <PageContainer>
      <div className="page-header">
        <Link to="/users" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className='bx bx-left-arrow-alt'></i> Back to Users
        </Link>
      </div>

      <UserProfileCard>
        <div className="main-avatar">
          {user.img ? <img src={user.img} alt={user.username} /> : <i className='bx bxs-user'></i>}
        </div>
        <h2>{user.username}</h2>
        <div className="email">{user.email}</div>

        <div className="stats">
          <div className="stat">
            <div className="label">Status</div>
            <div className="value" style={{ color: 'var(--success)' }}>Active</div>
          </div>
          <div className="stat">
            <div className="label">Role</div>
            <div className="value">Customer</div>
          </div>
          <div className="stat">
            <div className="label">Joined</div>
            <div className="value">{user.createdAt?.substring(0, 10)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary">Edit Profile</button>
          <button className="btn" style={{ background: '#fee2e2', color: 'var(--danger)' }}>Suspend User</button>
        </div>
      </UserProfileCard>
    </PageContainer>
  );
};


