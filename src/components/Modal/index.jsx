import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #bbb;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  /* background: white; */
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Input = styled.input`
	padding: 12px;
	font-size: 16px;
	border: 1px solid #444;
	border-radius: 8px;
	background-color: #222;
	color: #fff;
	::placeholder {
		color: #bbb;
	}
  margin: 7px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = ({ title, inputValue, onInputChange, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <h2>{title}</h2>
        <Input
          type="text"
          placeholder="Enter note title"
          value={inputValue}
          onChange={onInputChange}
        />
        <div>
          <Button onClick={onConfirm}>Create</Button>
          <Button
            onClick={onCancel}
            style={{ marginLeft: "10px", backgroundColor: "#ccc", color: "#000" }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
