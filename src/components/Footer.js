import React from 'react';
import styled from '@emotion/styled';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FooterBar = styled.footer`
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  padding: 3rem 0 2rem 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  flex-shrink: 0;
`;
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2rem;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FooterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #43a047;
  margin: 0 0 0.5rem 0;
  border-bottom: 2px solid #43a047;
  padding-bottom: 0.5rem;
`;
const FooterText = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 0;
  line-height: 1.6;
`;
const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;
const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #43a047 0%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(67,160,71,0.2);
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 4px 16px rgba(67,160,71,0.3);
  }
`;
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;
const ContactIcon = styled.div`
  color: #43a047;
  font-size: 1.2rem;
`;
const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const QuickLink = styled.a`
  color: #ccc;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #43a047;
  }
`;
const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #444;
  color: #999;
  font-size: 0.9rem;
`;

const Footer = () => (
  <FooterBar>
    <FooterContent>
      <FooterSection>
        <FooterTitle>Song Manager</FooterTitle>
        <FooterText>
          Your ultimate music collection management platform.
          Track, organize, and discover your favorite songs with ease.
        </FooterText>
        <SocialLinks>
          <SocialLink href="#" title="Facebook">
            <FaFacebook />
          </SocialLink>
          <SocialLink href="#" title="Twitter">
            <FaTwitter />
          </SocialLink>
          <SocialLink href="#" title="Instagram">
            <FaInstagram />
          </SocialLink>
          <SocialLink href="#" title="YouTube">
            <FaYoutube />
          </SocialLink>
        </SocialLinks>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Quick Links</FooterTitle>
        <QuickLinks>
          <QuickLink href="#">Home</QuickLink>
          <QuickLink href="#">About Us</QuickLink>
          <QuickLink href="#">Features</QuickLink>
          <QuickLink href="#">Pricing</QuickLink>
          <QuickLink href="#">Contact</QuickLink>
        </QuickLinks>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Contact Info</FooterTitle>
        <ContactItem>
          <ContactIcon><FaEnvelope /></ContactIcon>
          <span>info@songmanager.com</span>
        </ContactItem>
        <ContactItem>
          <ContactIcon><FaPhone /></ContactIcon>
          <span>+1 (555) 123-4567</span>
        </ContactItem>
        <ContactItem>
          <ContactIcon><FaMapMarkerAlt /></ContactIcon>
          <span>123 Music Street, Melody City</span>
        </ContactItem>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Newsletter</FooterTitle>
        <FooterText>
          Subscribe to our newsletter for the latest updates and music recommendations.
        </FooterText>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: '0.7rem',
            borderRadius: '0.5rem',
            border: '1px solid #444',
            background: '#333',
            color: '#fff',
            fontSize: '1rem',
            marginTop: '0.5rem'
          }}
        />
      </FooterSection>
    </FooterContent>

    <Copyright>
      &copy; {new Date().getFullYear()} Song Manager. All rights reserved. |
      Privacy Policy | Terms of Service
    </Copyright>
  </FooterBar>
);

export default Footer; 