import React from 'react';
import styled from '@emotion/styled';
import { FaMusic, FaHome, FaStar, FaInfoCircle, FaSignInAlt, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';

const Bar = styled.nav`
  position: sticky;
  bottom: 0;
  width: 100%;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 -2px 16px rgba(25, 118, 210, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 2rem;
  z-index: 100;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.7rem 0.5rem;
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;
const LogoCircle = styled.span`
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #43a047 60%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.span`
  font-size: 1.2rem;
  color: #fff;
`;
const AppName = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(90deg, #43a047 30%, #1976d2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const Center = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
const NavLink = styled.a`
  color: #1976d2;
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  &:hover, &:focus {
    color: #43a047;
    outline: none;
  }
`;
const Right = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;
const ActionBtn = styled.button`
  background: linear-gradient(90deg, #1976d2 60%, #43a047 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  padding: 0.45rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.12s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover, &:focus {
    background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13);
    outline: none;
    transform: scale(1.04);
  }
  &:active {
    background: #43a047;
    color: #fff;
    transform: scale(0.98);
  }
`;

const NavBar = ({ onLogin, onRegister, onThemeToggle, themeMode }) => (
  <Bar>
    <Left>
      <LogoCircle><Logo><FaMusic /></Logo></LogoCircle>
      <AppName>Song Manager</AppName>
    </Left>
    <Center>
      <NavLink href="#home"><FaHome /> Home</NavLink>
      <NavLink href="#features"><FaStar /> Features</NavLink>
      <NavLink href="#about"><FaInfoCircle /> About</NavLink>
    </Center>
    <Right>
      <ActionBtn onClick={onLogin}><FaSignInAlt /> Login</ActionBtn>
      <ActionBtn onClick={onRegister}><FaUserPlus /> Register</ActionBtn>
      <ActionBtn onClick={onThemeToggle} title="Toggle theme">
        {themeMode === 'light' ? <FaMoon /> : <FaSun />}
      </ActionBtn>
    </Right>
  </Bar>
);

export default NavBar; 