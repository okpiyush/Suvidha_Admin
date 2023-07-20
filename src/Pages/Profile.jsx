import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../Context/LoginContext';

const UserData = styled.div`
  background-color: rgba(114, 49, 235);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const UserImage = styled.img`
  width: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const UserEmail = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const Button = styled.button`
  width: 250px;
  padding: 10px;
  font-size: 16px;
  background-color: rgba(114, 49, 235);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(114, 49, 235, 0.8);
  }

  &:disabled {
    background-color: rgba(114, 49, 235, 0.5);
    cursor: not-allowed;
  }
`;

const Profile = () => {
  const [disabled, setDisabled] = useState(true);
  const { loginData } = useContext(LoginContext);
  const [user, setUser] = useState("Not Logged in");
  const [email, setEmail] = useState("Login to check");

  useEffect(() => {
    if (loginData) {
      setUser(loginData.username);
      setEmail(loginData.email);
    }
  }, [loginData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
  };

  return (
    <UserData>
      <UserCard>
        <UserImage src={loginData?.img} alt="User Image" />
        <UserName>{user}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserCard>

      <UserCard>
        <Title>Change Password</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type='password'
            placeholder='New Password'
            required
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            required
          />
          <Input
            type='password'
            placeholder='Current Password'
            required
          />
          <Button disabled={disabled} type='submit'>Submit</Button>
        </Form>
      </UserCard>
    </UserData>
  );
};

export default Profile;
