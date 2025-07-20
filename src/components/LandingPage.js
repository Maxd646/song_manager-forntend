// unchanged imports
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  FaSignInAlt,
  FaUserPlus,
  FaMusic,
  FaListOl,
  FaUserShield,
  FaTachometerAlt,
  FaStar,
  FaQuoteLeft,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Modern font import
const FontFace = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Inter:wght@400;600&display=swap');
`;

const Page = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(120deg, #e3f2fd 0%, #f4f6fa 60%, #e3f2fd 100%);
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: 'Montserrat', 'Inter', sans-serif;
  position: relative;
`;
const BgShapes = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;
const BgCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.18;
`;
const MusicNote = styled(motion.div)`
  position: absolute;
  font-size: 2.2rem;
  color: #1976d2;
  opacity: 0.13;
  z-index: 1;
`;
const WideSection = styled.section`
  width: 100vw;
  padding: 0;
  margin: 0;
  background: none;
  box-sizing: border-box;
  position: relative;
`;
const HeroRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  min-height: 90vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 2;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;
const GlassHero = styled(motion.div)`
  background: rgba(255,255,255,0.55);
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.13);
  border-radius: 2.5rem;
  padding: 3.5rem 3rem 3rem 3rem;
  backdrop-filter: blur(18px);
  max-width: 600px;
  margin: 2rem 0 2rem 2.5vw;
  @media (max-width: 900px) {
    margin: 2rem auto;
    padding: 2.2rem 1.2rem;
  }
`;
const HeroLeft = styled(motion.div)`
  flex: 1;
  z-index: 2;
`;
const AppName = styled(motion.h1)`
  font-size: 4.2rem;
  font-weight: 900;
  background: linear-gradient(90deg, #1976d2 10%, #43a047 90%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.7rem;
  letter-spacing: 2px;
  font-family: 'Montserrat', 'Inter', sans-serif;
  text-shadow: 0 4px 24px rgba(25, 118, 210, 0.08);
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;
const Tagline = styled(motion.p)`
  font-size: 1.7rem;
  font-weight: 700;
  color: #43a047;
  margin-bottom: 1.2rem;
  font-family: 'Montserrat', 'Inter', sans-serif;
  text-shadow: 0 2px 12px rgba(67,160,71,0.08);
`;
const Description = styled.p`
  font-size: 1.15rem;
  max-width: 500px;
  margin-bottom: 2.2rem;
  color: #444;
  font-family: 'Inter', sans-serif;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg, #1976d2 60%, #43a047 100%);
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2.5rem;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0.7rem 0.7rem 0.7rem 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4,2,.3,1);
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 2px 16px rgba(25, 118, 210, 0.10);
  &:hover {
    transform: scale(1.08) translateY(-2px);
    background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
    box-shadow: 0 6px 32px rgba(67,160,71,0.13);
  }
`;
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
  width: 100%;
  padding: 0;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const StatCard = styled(motion.div)`
  background: rgba(255,255,255,0.65);
  padding: 2rem 1.2rem 1.5rem 1.2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 32px rgba(25, 118, 210, 0.13);
  text-align: center;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(67,160,71,0.10);
  transition: transform 0.18s cubic-bezier(.4,2,.3,1);
  &:hover {
    transform: scale(1.04) translateY(-2px);
    box-shadow: 0 8px 32px rgba(67,160,71,0.13);
  }
`;
const StatNumber = styled(motion.div)`
  font-size: 2.7rem;
  font-weight: 900;
  color: #43a047;
  font-family: 'Montserrat', 'Inter', sans-serif;
  text-shadow: 0 2px 12px rgba(67,160,71,0.08);
`;
const StatLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1976d2;
  font-family: 'Montserrat', 'Inter', sans-serif;
`;
const HeroRight = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const IllustrationCard = styled(motion.div)`
  width: 340px;
  height: 340px;
  background: rgba(255,255,255,0.7);
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(67,160,71,0.10);
  @media (max-width: 600px) {
    width: 220px;
    height: 220px;
  }
`;
const FeaturesSection = styled.section`
  background: linear-gradient(120deg, #e3f2fd 60%, #b3e5fc 100%);
  padding: 4rem 0 3rem 0;
  width: 100vw;
  margin: 0;
  position: relative;
  z-index: 2;
`;
const FeaturesRow = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  margin: 0;
  padding: 0 2vw;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 0 0.5vw;
  }
`;
const FeatureCard = styled(motion.div)`
  background: rgba(255,255,255,0.85);
  padding: 2.2rem 1.2rem 1.7rem 1.2rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.10);
  text-align: center;
  width: 100%;
  transition: transform 0.22s cubic-bezier(.4,2,.3,1), box-shadow 0.22s;
  border: 1.5px solid rgba(25, 118, 210, 0.08);
  &:hover {
    transform: scale(1.06) translateY(-4px) rotate(-1deg);
    box-shadow: 0 8px 32px rgba(67,160,71,0.13);
  }
`;
const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #43a047;
  margin-bottom: 0.7rem;
`;
const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: #1976d2;
  margin-bottom: 0.3rem;
  font-family: 'Montserrat', 'Inter', sans-serif;
`;
const FeatureSubtitle = styled.p`
  font-size: 1.05rem;
  color: #444;
  font-family: 'Inter', sans-serif;
`;

const features = [
  { icon: <FaMusic />, title: 'Add / View Songs', subtitle: 'Upload & browse tracks' },
  { icon: <FaListOl />, title: 'Pagination', subtitle: 'Browse with ease' },
  { icon: <FaUserShield />, title: 'User Auth', subtitle: 'Secure access for users' },
  { icon: <FaTachometerAlt />, title: 'Dashboard', subtitle: 'Analytics and stats' },
];

const musicNotes = [
  { x: '10vw', y: '12vh', delay: 0 },
  { x: '80vw', y: '18vh', delay: 0.5 },
  { x: '30vw', y: '80vh', delay: 1 },
  { x: '60vw', y: '60vh', delay: 1.5 },
];

const SnakeLineWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 120px;
  z-index: 2;
  pointer-events: none;
  @media (max-width: 600px) {
    height: 60px;
  }
`;

const HeroAvatar = styled.img`
  width: 120px;
  height: auto;
  object-fit: cover;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13);
  border: 4px solid #fff;
  margin-left: 1.5rem;
  background: #e3f2fd;
  @media (max-width: 600px) {
    width: 70px;
    margin-left: 0.7rem;
  }
`;
const ArtistSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-left: 2rem;
  @media (max-width: 600px) {
    margin-left: 1rem;
    gap: 1rem;
  }
`;
const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.7);
  border-radius: 1.5rem;
  padding: 1.5rem 1.2rem;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.07);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(67,160,71,0.10);
  @media (max-width: 600px) {
    padding: 1rem 0.8rem;
    gap: 0.8rem;
  }
`;
const ArtistImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.13);
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;
const ArtistName = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1976d2;
  font-family: 'Montserrat', 'Inter', sans-serif;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const TestimonialsSection = styled.section`
  background: linear-gradient(120deg, #f4f6fa 60%, #e3f2fd 100%);
  padding: 4rem 0 3rem 0;
  width: 100vw;
  margin: 0;
  position: relative;
  z-index: 2;
`;
const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2vw;
`;
const TestimonialsTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #43a047 0%, #1976d2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-family: 'Montserrat', 'Inter', sans-serif;
`;
const TestimonialsSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  font-family: 'Inter', sans-serif;
`;
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const TestimonialCard = styled(motion.div)`
  background: rgba(255,255,255,0.9);
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  border: 1px solid rgba(67,160,71,0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(25, 118, 210, 0.1);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px rgba(67,160,71,0.2);
  }
`;
const QuoteIcon = styled.div`
  color: #43a047;
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.7;
`;
const TestimonialText = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-family: 'Inter', sans-serif;
`;
const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #43a047 0%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
`;
const AuthorInfo = styled.div`
  flex: 1;
`;
const AuthorName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 0.2rem;
  font-family: 'Montserrat', 'Inter', sans-serif;
`;
const AuthorRole = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-family: 'Inter', sans-serif;
`;
const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
`;
const Star = styled(FaStar)`
  color: #ffd600;
  font-size: 1.1rem;
`;

const testimonials = [
  {
    text: "Song Manager has completely transformed how I organize my music collection. The interface is intuitive and the features are exactly what I needed!",
    author: "Tolesa Melkamu",
    role: "Music Producer",
    rating: 5,
    avatar: "T"
  },
  {
    text: "As a DJ, I need quick access to my tracks. This app makes it so easy to find and manage my songs. Highly recommended!",
    author: "Amira Suluman",
    role: "Professional DJ",
    rating: 5,
    avatar: "A"
  },
  {
    text: "The best music management app I've ever used. Clean design, fast performance, and all the features I could ask for.",
    author: "Abebe Samuiel",
    role: "Music Enthusiast",
    rating: 5,
    avatar: "A"
  }
];

const LandingPage = ({ onLogin, onRegister }) => {
  const [stats, setStats] = useState({ songs: 0, users: 0, playlists: 0 });
  useEffect(() => {
    const targets = { songs: 1240, users: 320, playlists: 87 };
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        songs: Math.floor(targets.songs * progress),
        users: Math.floor(targets.users * progress),
        playlists: Math.floor(targets.playlists * progress),
      });
      if (step >= steps) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page>
      <FontFace />
      <BgShapes>
        <BgCircle animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} style={{ width: 500, height: 500, left: -140, top: -100, background: '#43a047' }} />
        <BgCircle animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity }} style={{ width: 340, height: 340, right: -120, top: 60, background: '#1976d2' }} />
        <BgCircle animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity }} style={{ width: 260, height: 260, left: 120, bottom: -80, background: '#ffd600' }} />
        <BgCircle animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 9, repeat: Infinity }} style={{ width: 200, height: 200, right: 80, bottom: -60, background: '#00e676' }} />
        {musicNotes.map((note, i) => (
          <MusicNote
            key={i}
            initial={{ y: 0, opacity: 0.13 }}
            animate={{ y: [0, -20, 0], opacity: [0.13, 0.22, 0.13] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: note.delay }}
            style={{ left: note.x, top: note.y }}
          >
            <FaMusic />
          </MusicNote>
        ))}
      </BgShapes>
      <SnakeLineWrapper>
        <svg width="100%" height="100%" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="snake-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#43a047" />
              <stop offset="0.5" stopColor="#ffd600" />
              <stop offset="1" stopColor="#1976d2" />
            </linearGradient>
            <animateTransform attributeName="gradientTransform" type="translate" from="0,0" to="100,0" dur="4s" repeatCount="indefinite" />
          </defs>
          <path
            d="M0,60 Q360,0 720,60 T1440,60"
            stroke="url(#snake-gradient)"
            strokeWidth="7"
            fill="none"
            style={{ filter: 'drop-shadow(0 2px 12px #1976d222)' }}
          >
            <animate attributeName="d" values="M0,60 Q360,0 720,60 T1440,60;M0,60 Q360,120 720,60 T1440,60;M0,60 Q360,0 720,60 T1440,60" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>
      </SnakeLineWrapper>
      <WideSection>
        <HeroRow>
          <HeroLeft>
            <GlassHero
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <AppName
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Song Manager
                </AppName>
                <HeroAvatar src="/aschalew.webp" alt="Aschalew" />
              </div>
              <Tagline
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Track your songs in real time
              </Tagline>
              <Description>
                Manage your music collection easily. <br />
                Login or register to get started.
              </Description>
              <div>
                <CTAButton
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onLogin}
                >
                  <FaSignInAlt /> Get Stared
                </CTAButton>
                <CTAButton
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onRegister}
                >
                  <FaUserPlus /> Learn More
                </CTAButton>
              </div>
            </GlassHero>
          </HeroLeft>
          <HeroRight>
            <ArtistSection>
              <ArtistCard>
                <ArtistImage src="/images/teddy.jpg" alt="Teddy Afro" />
                <ArtistName>Teddy Afro</ArtistName>
              </ArtistCard>
              <ArtistCard>
                <ArtistImage src="/images/abel.jpg" alt="Abel Mekkonen" />
                <ArtistName>Abel Mekkonen</ArtistName>
              </ArtistCard>
              <ArtistCard>
                <ArtistImage src="/images/mohamed.jpg" alt="Mohammed Ahmed" />
                <ArtistName>Mohammed Ahmed</ArtistName>
              </ArtistCard>
            </ArtistSection>
            <IllustrationCard
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ scale: 1.04, rotate: 2 }}
            >
              <svg width="200" height="200" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="85" fill="#e3f2fd" />
                <circle cx="90" cy="90" r="65" fill="#43a047" fillOpacity="0.13" />
                <circle cx="90" cy="90" r="45" fill="#1976d2" fillOpacity="0.13" />
                <path d="M130 70V140C130 155 100 155 100 140V90" stroke="#1976d2" strokeWidth="7" strokeLinecap="round" />
                <circle cx="100" cy="90" r="10" fill="#43a047" stroke="#1976d2" strokeWidth="4" />
                <rect x="60" y="120" width="20" height="40" rx="10" fill="#43a047" />
                <rect x="104" y="130" width="16" height="28" rx="8" fill="#1976d2" />
              </svg>
            </IllustrationCard>
          </HeroRight>
        </HeroRow>
        <StatsRow>
          <StatCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <StatNumber
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {stats.songs}+
            </StatNumber>
            <StatLabel>Songs</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <StatNumber
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            >
              {stats.users}+
            </StatNumber>
            <StatLabel>Users</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <StatNumber
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            >
              {stats.playlists}+
            </StatNumber>
            <StatLabel>Playlists</StatLabel>
          </StatCard>
        </StatsRow>
      </WideSection>
      <FeaturesSection>
        <FeaturesRow>
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.08, rotate: -2 }}
            >
              <FeatureIcon>{f.icon}</FeatureIcon>
              <FeatureTitle>{f.title}</FeatureTitle>
              <FeatureSubtitle>{f.subtitle}</FeatureSubtitle>
            </FeatureCard>
          ))}
        </FeaturesRow>
      </FeaturesSection>
      <TestimonialsSection>
        <TestimonialsContainer>
          <TestimonialsTitle>What People Say</TestimonialsTitle>
          <TestimonialsSubtitle>Don't just take our word for it - hear from our users</TestimonialsSubtitle>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <QuoteIcon><FaQuoteLeft /></QuoteIcon>
                <StarRating>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </StarRating>
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>{testimonial.avatar}</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.author}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>
    </Page>
  );
};

export default LandingPage;
