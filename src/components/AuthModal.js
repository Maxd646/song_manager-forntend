import React, { useState } from 'react';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
`;
const Modal = styled.div`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: flex-end;
`;
const Button = styled.button`
  padding: 0.5rem 1.3rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  min-width: 90px;
  position: relative;
  &:last-of-type {
    background: #888;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const ErrorMsg = styled.div`
  color: #d32f2f;
  background: #fff0f0;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
  font-size: 1rem;
`;
const ShowPassword = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;
const Spinner = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-top: 2px solid #888;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  @keyframes spin {
    to { transform: translateY(-50%) rotate(360deg); }
  }
`;

const AuthModal = ({ mode, onClose, onSubmit, error, loading, asPage = false }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  const content = (
    <Modal>
      <Title>{mode === 'login' ? 'Login' : 'Register'}</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          autoFocus
          disabled={loading}
        />
        <Input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <ShowPassword>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((v) => !v)}
            disabled={loading}
          />
          Show password
        </ShowPassword>
        <ButtonRow>
          {onClose && <Button type="button" onClick={onClose} disabled={loading}>Cancel</Button>}
          <Button type="submit" disabled={loading}>
            {loading && <Spinner />}
            {mode === 'login' ? 'Login' : 'Register'}
          </Button>
        </ButtonRow>
      </form>
    </Modal>
  );
  if (asPage) {
    return <PageWrapper>{content}</PageWrapper>;
  }
  return <Overlay>{content}</Overlay>;
};

export default AuthModal; 