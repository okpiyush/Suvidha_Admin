import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 3rem;
  max-width: 320px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes scaleUp {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 3rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: var(--text-muted);
  font-size: 0.875rem;
  line-height: 1.5;
`;

const SuccessModel = () => {
  return (
    <ModalWrapper>
      <ModalContent>
        <IconContainer>
          <i className='bx bx-check-circle'></i>
        </IconContainer>
        <Title>Action Successful</Title>
        <Message>The operation has been completed successfully and the data has been updated.</Message>
      </ModalContent>
    </ModalWrapper>
  );
};

export default SuccessModel;
