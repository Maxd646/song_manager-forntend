import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const HeaderBar = styled.header`
  width: 100%;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(16px);
  color: #222;
  padding: 1.1rem 0;
  box-shadow: 0 2px 24px rgba(25, 118, 210, 0.10);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 2px solid rgba(67,160,71,0.10);
  z-index: 10;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-left: 2rem;
  @media (max-width: 600px) {
    margin-left: 1rem;
  }
`;
const LogoCircle = styled.span`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #43a047 60%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(67,160,71,0.13);
`;
const Logo = styled.span`
  font-size: 1.5rem;
  color: #fff;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.10));
`;
const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: 800;
  background: linear-gradient(90deg, #43a047 30%, #1976d2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 2rem;
  @media (max-width: 600px) {
    margin-right: 1rem;
    gap: 0.5rem;
  }
`;
const ActionBtn = styled.button`
  background: linear-gradient(90deg, #1976d2 60%, #43a047 100%);
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.45rem 1.2rem;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.12s;
  &:hover, &:focus {
    background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13);
    outline: none;
    transform: translateY(-2px) scale(1.04);
  }
  &:active {
    background: #43a047;
    color: #fff;
    transform: scale(0.98);
  }
`;
const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 1.7rem;
  cursor: pointer;
  transition: color 0.2s, transform 0.12s;
  margin-left: 1rem;
  &:hover, &:focus {
    color: #43a047;
    outline: none;
    transform: scale(1.15);
  }
  &:active {
    color: #ffd600;
    transform: scale(0.95);
  }
`;

const Header = ({ themeMode, toggleTheme, isLoggedIn, onLogin, onRegister, onLogout }) => {
  const theme = useTheme();
  return (
    <HeaderBar theme={theme}>
      <TitleRow>
        <LogoCircle><Logo>🎵</Logo></LogoCircle>
        <Title theme={theme}>Song Manager</Title>
      </TitleRow>
      <Actions>
        <ThemeToggle onClick={toggleTheme} title="Toggle theme" theme={theme}>
          {themeMode === 'light' ? '🌙' : '☀️'}
        </ThemeToggle>
        {isLoggedIn ? (
          <ActionBtn theme={theme} onClick={onLogout}>Logout</ActionBtn>
        ) : (
          <>
            <ActionBtn theme={theme} onClick={onLogin}>Login</ActionBtn>
            <ActionBtn theme={theme} onClick={onRegister}>Sign Up</ActionBtn>
          </>
        )}
      </Actions>
    </HeaderBar>
  );
};

export default Header; 