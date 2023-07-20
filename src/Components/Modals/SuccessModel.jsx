import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
background-color: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:10;
`;

const ModalContent = styled.div`
  background-color: rgba(256,256,256,1);
  z-index:2;
  border-radius: 4px;
  padding: 20px;
  max-width: 400px;
  text-align: center;
`;
const Img=styled.img`
  background-color:white;

`

const ConfirmationModal = ({ item, onDelete, onCancel }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <Img src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif" />
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
