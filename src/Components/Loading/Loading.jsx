import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.95); }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-out;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--primary-light);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: ${spin} 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
`;

const LoadingText = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Loading = () => {
  return (
    <LoadingOverlay>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingOverlay>
  );
};

export default Loading;