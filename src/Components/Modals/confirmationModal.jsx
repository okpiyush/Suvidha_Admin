import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  max-width: 400px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  margin: 0 10px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(ModalButton)`
  background-color: red;
  color: #fff;
`;

const CancelButton = styled(ModalButton)`
  background-color: #ccc;
  color: #000;
`;

const ConfirmationModal = ({ item, onDelete, onCancel }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalTitle>Confirm Deletion</ModalTitle>
        <ModalText>Are you sure you want to delete this item?</ModalText>
        <ModalText>{item.title}</ModalText>
        <ModalButtonWrapper>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ModalButtonWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
