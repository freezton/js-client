import React from 'react';
import styled from 'styled-components';

// Стиль для оверлея модального окна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Стиль для модального окна
const ModalWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

// Стиль для кнопок
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#0056b3'};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

// Компонент для отображения картинки в модальном окне
const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <h2>Image Preview</h2>
        <div>
          <img
            src={imageUrl}
            alt="Selected"
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'contain',
            }}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={onClose} bgColor="#ccc" hoverColor="#999">Close</Button>
        </div>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ImageModal;
