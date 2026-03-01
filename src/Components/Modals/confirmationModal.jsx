import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  max-width: 440px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: #fee2e2;
  color: var(--danger);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-main);
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: var(--text-muted);
  line-height: 1.5;

  span {
    display: block;
    margin-top: 0.5rem;
    font-weight: 700;
    color: var(--text-main);
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: none;

  &:hover {
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: var(--danger);
  color: #fff;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);

  &:hover {
    background-color: #dc2626;
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: var(--bg-main);
  color: var(--text-main);
  border: 1px solid var(--border);

  &:hover {
    background-color: var(--border);
  }
`;

const ConfirmationModal = ({ item, onDelete, onCancel }) => {
  return (
    <ModalWrapper onClick={onCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <IconWrapper>
          <i className='bx bx-error-circle'></i>
        </IconWrapper>
        <ModalTitle>Confirm Deletion</ModalTitle>
        <ModalText>
          Are you sure you want to delete this item? This action cannot be undone.
          {item && <span>{item.title}</span>}
        </ModalText>
        <ModalButtonWrapper>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteButton onClick={onDelete}>Delete Item</DeleteButton>
        </ModalButtonWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
