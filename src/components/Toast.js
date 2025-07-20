import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  min-width: 220px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: ${({ theme, type }) =>
        type === 'error' ? '#d32f2f' : theme.primary};
  color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: fadeIn 0.3s;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
`;

const Toast = ({ message, type = 'success', onClose }) => {
    const theme = useTheme();
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);
    return (
        <ToastContainer theme={theme} type={type}>
            {message}
            <CloseBtn onClick={onClose} title="Close">×</CloseBtn>
        </ToastContainer>
    );
};

export default Toast; 