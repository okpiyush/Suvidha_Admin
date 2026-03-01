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

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: var(--transition);

  &:hover {
    background: var(--bg-main);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      i {
        color: var(--primary);
        font-size: 1.25rem;
      }
    }

    .details {
      .name {
        font-weight: 600;
        color: var(--text-main);
        font-size: 0.9375rem;
      }
      .date {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }
  }
`;

const ViewButton = styled(Link)`
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

const NewUser = () => {
  const { loginData } = useContext(LoginContext);
  const url = "http://localhost:5005/api/users?new=true";
  const users = useHook(url, loginData?.accessToken);

  const displayUsers = users || [];

  return (
    <Container>
      <Header>
        <h3>New Users</h3>
        <ViewButton to="/users" className="secondary">View All</ViewButton>
      </Header>
      <List>
        {displayUsers.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No new users found.</p>
        ) : (
          displayUsers.map((item) => (
            <UserItem key={item._id}>
              <div className="user-info">
                <div className="avatar">
                  {item.img ? <img src={item.img} alt={item.username} /> : <i className='bx bxs-user'></i>}
                </div>
                <div className="details">
                  <div className="name">{item.username}</div>
                  <div className="date">Joined {item.createdAt?.substring(0, 10)}</div>
                </div>
              </div>
              <ViewButton to={`/users/${item._id}`}>
                View
              </ViewButton>
            </UserItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default NewUser;