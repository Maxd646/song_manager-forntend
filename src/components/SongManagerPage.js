import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import SongForm from './SongForm';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUserCircle, FaMusic, FaHeadphones, FaVideo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Animated background shapes
const BgShapes = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;
const BgCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.13;
`;

// NOTE: If you want to use custom fonts, add the <link> to public/index.html instead of using @import in styled components.
const MEDIA_BASE_URL = 'http://localhost:8000';
const PageFade = styled(motion.div)`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(120deg, #e3f2fd 0%, #f4f6fa 60%, #e3f2fd 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3rem;
  font-family: 'Montserrat', 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
`;
const FloatingNote = styled(motion.div)`
  position: fixed;
  bottom: 2.5rem;
  left: 2.5rem;
  font-size: 3rem;
  color: #1976d2;
  opacity: 0.18;
  z-index: 100;
  pointer-events: none;
`;
const AnimatedHeader = styled(motion.div)`
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 10;
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(18px);
  box-shadow: 0 4px 32px #1976d222;
  border-bottom: 2.5px solid #1976d2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0 0.7rem 0;
`;
const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(18px);
  box-shadow: 0 4px 32px #1976d222;
  padding: 2.2rem 0 1.2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GradientTitle = styled.h2`
  font-size: 2.7rem;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #1976d2 10%, #43a047 90%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin: 0 0 0.7rem 0;
  font-family: 'Montserrat', 'Inter', sans-serif;
  text-shadow: 0 2px 12px #1976d222;
`;
const AccentBar = styled.div`
  width: 120px;
  height: 7px;
  border-radius: 4px;
  margin: 0.2rem 0 1.2rem 0;
  background: linear-gradient(90deg, #43a047 0%, #ffd600 50%, #1976d2 100%);
  box-shadow: 0 2px 12px #1976d222;
`;
const HeaderRow = styled.div`
  width: 100vw;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  margin-bottom: 0.2rem;
`;
const UserAvatar = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #43a047 60%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(67,160,71,0.13);
  color: #fff;
  font-size: 1.5rem;
`;
const GlassSearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255,255,255,0.7);
  border-radius: 2rem;
  box-shadow: 0 4px 24px #1976d222;
  padding: 0.5rem 1.2rem;
  backdrop-filter: blur(12px);
  border: 1.5px solid #1976d2;
`;
const SearchIcon = styled(FaSearch)`
  color: #1976d2;
  font-size: 1.3rem;
  opacity: 0.7;
  margin-left: 0.5rem;
`;
const SearchInput = styled.input`
  flex: 1;
  padding: 0.7rem 1.2rem;
  border-radius: 2rem;
  border: none;
  font-size: 1.1rem;
  background: transparent;
  outline: none;
  font-family: 'Inter', sans-serif;
`;
const AddBtn = styled.button`
  background: linear-gradient(90deg, #1976d2 60%, #43a047 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 1.7rem;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);
  transition: background 0.18s, transform 0.12s;
  &:hover {
    background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
    transform: scale(1.05);
  }
`;
const GlowingAddBtn = styled(AddBtn)`
  box-shadow: 0 0 0 0 #43a047, 0 0 16px 2px #43a04744;
  border: 2px solid #43a047;
  background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
  transition: box-shadow 0.22s, background 0.22s, border 0.22s;
  &:hover {
    box-shadow: 0 0 0 4px #43a04733, 0 0 32px 4px #1976d244;
    background: linear-gradient(90deg, #1976d2 60%, #43a047 100%);
    border: 2px solid #1976d2;
  }
`;
const FloatingAddBtn = styled(AddBtn)`
  position: fixed;
  bottom: 2.2rem;
  right: 2.2rem;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18);
  padding: 1.1rem 2.2rem;
  font-size: 1.3rem;
  display: none;
  @media (max-width: 700px) {
    display: flex;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 2rem;
  width: max-content;
  min-width: 100%;
  margin: 2.5rem 0 1rem 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: auto;
  justify-items: start;
  margin-left: 0;
`;

const SnakeSeparator = styled.div`
  width: 100%;
  margin: 2.5rem 0 2rem 0;
  display: block;
`;
const Card = styled(motion.div)`
  background: rgba(255,255,255,0.82);
  border-radius: 1.1rem;
  box-shadow: 0 2px 16px rgba(25, 118, 210, 0.13);
  padding: 1.1rem 0.7rem 1rem 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  position: relative;
  border: 1px solid rgba(67,160,71,0.10);
  transition: box-shadow 0.18s, transform 0.18s;
  backdrop-filter: blur(6px);
  &:hover {
    box-shadow: 0 4px 16px rgba(67,160,71,0.13);
    transform: translateY(-2px) scale(1.02);
    background: rgba(255,255,255,0.95);
  }
`;
const CardMedia = styled.div`
  width: 100%;
  margin-bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const CardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: #1976d2;
  margin: 0 0 0.15rem 0;
  font-family: 'Montserrat', 'Inter', sans-serif;
`;
const CardMeta = styled.div`
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 0.15rem;
  font-family: 'Inter', sans-serif;
`;
const CardActions = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 0.7rem;
`;
const ActionBtn = styled.button`
  background: linear-gradient(90deg, #1976d2 60%, #43a047 100%);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);
  transition: background 0.18s, transform 0.12s;
  &:hover {
    background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
    transform: scale(1.07);
  }
  &:last-of-type {
    background: #d32f2f;
    &:hover {
      background: #b71c1c;
    }
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  margin: 2.5rem 0 0 0;
  background: rgba(255,255,255,0.7);
  border-radius: 2rem;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.07);
  padding: 0.5rem 1.5rem;
  font-family: 'Inter', sans-serif;
`;
const PageBtn = styled.button`
  padding: 0.5rem 1.2rem;
  border: none;
  background: #1976d2;
  color: white;
  border-radius: 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.18s, transform 0.12s;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 320px;
  max-width: 95vw;
  z-index: 1001;
`;
const EmptyState = styled.div`
  width: 100vw;
  max-width: 1200px;
  margin: 3rem auto 0 auto;
  padding: 3rem 2vw;
  text-align: center;
  color: #1976d2;
  font-size: 1.3rem;
  background: rgba(255,255,255,0.7);
  border-radius: 2rem;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.07);
  font-family: 'Montserrat', 'Inter', sans-serif;
`;

const SongManagerPage = (props) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditSong, setModalEditSong] = useState(null);

  const API_BASE_URL = 'http://localhost:8000/api/songs/';

  // Fetch songs
  const fetchSongs = () => {
    setLoading(true);
    axios.get(API_BASE_URL)
      .then(res => setSongs(res.data))
      .catch(err => setError('Failed to fetch songs'))
      .finally(() => setLoading(false));
  };
  const SONGS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(songs.length / SONGS_PER_PAGE));
  const paginatedSongs = songs.slice(
    (page - 1) * SONGS_PER_PAGE,
    page * SONGS_PER_PAGE
  );

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  React.useEffect(() => {
    fetchSongs();
  }, []);

  // Add song
  const handleAddSong = (data, isFormData) => {
    setLoading(true);
    axios.post(API_BASE_URL, data, isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {})
      .then(() => fetchSongs())
      .catch(() => setError('Failed to add song'))
      .finally(() => setLoading(false));
  };
  // Edit song
  const handleEditSong = (data, isFormData) => {
    setLoading(true);
    const id = isFormData ? modalEditSong.id : data.id;
    axios.put(`${API_BASE_URL}${id}/`, data, isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {})
      .then(() => fetchSongs())
      .catch(() => setError('Failed to update song'))
      .finally(() => setLoading(false));
  };
  // Delete song
  const handleDeleteSong = (id) => {
    if (!window.confirm('Delete this song?')) return;
    setLoading(true);
    axios.delete(`${API_BASE_URL}${id}/`)
      .then(() => fetchSongs())
      .catch(() => setError('Failed to delete song'))
      .finally(() => setLoading(false));
  };

  // Modal handlers
  const openAddModal = () => {
    setModalEditSong(null);
    setModalOpen(true);
  };
  const openEditModal = (song) => {
    setModalEditSong(song);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalEditSong(null);
  };
  const handleFormSubmitModal = (data, isFormData) => {
    if (modalEditSong) {
      handleEditSong(data, isFormData);
    } else {
      handleAddSong(data, isFormData);
    }
    closeModal();
  };

  // Filter songs by search
  const [search, setSearch] = useState('');
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    (song.album && song.album.toLowerCase().includes(search.toLowerCase()))
  );

  const cardsPerRow = 3;
  const rows = [];
  for (let i = 0; i < paginatedSongs.length; i += cardsPerRow) {
    rows.push(paginatedSongs.slice(i, i + cardsPerRow));
  }

  return (
    <PageFade
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BgShapes>
        <BgCircle animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} style={{ width: 500, height: 500, left: -140, top: -100, background: '#43a047' }} />
        <BgCircle animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity }} style={{ width: 340, height: 340, right: -120, top: 60, background: '#1976d2' }} />
        <BgCircle animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity }} style={{ width: 260, height: 260, left: 120, bottom: -80, background: '#ffd600' }} />
        <BgCircle animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 9, repeat: Infinity }} style={{ width: 200, height: 200, right: 80, bottom: -60, background: '#00e676' }} />
      </BgShapes>
      <FloatingNote
        animate={{ y: [0, -20, 0], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <FaMusic />
      </FloatingNote>
      <HeaderWrapper>
        <AccentBar />
        <GlassSearchBar>
          <SearchInput
            type="text"
            placeholder="Search by title, artist, or album..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <GlowingAddBtn onClick={openAddModal}><FaPlus /> Add Song</GlowingAddBtn>
        </GlassSearchBar>
      </HeaderWrapper>
      <SnakeSeparator>
        <svg width="100%" height="40" viewBox="0 0 900 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 20 Q 75 0, 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20" stroke="#1976d2" strokeWidth="4" fill="none" />
        </svg>
      </SnakeSeparator>
      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <Grid>
            {row.map((song, i) => (
              <Card
                key={song.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                style={{ boxShadow: '0 8px 32px #1976d222', border: '1.5px solid #1976d2', background: 'rgba(255,255,255,0.96)' }}
              >
                <CardMedia>
                  {song.audio_file && (
                    <audio controls style={{ width: '100%' }}>
                      <source src={song.audio_file.startsWith('http') ? song.audio_file : MEDIA_BASE_URL + song.audio_file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {song.video_file && (
                    <video controls style={{ width: '100%', borderRadius: '0.7rem' }} height={120}>
                      <source src={song.video_file.startsWith('http') ? song.video_file : MEDIA_BASE_URL + song.video_file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </CardMedia>
                <CardTitle>{song.title}</CardTitle>
                <CardMeta><FaMusic style={{ color: '#1976d2', marginRight: 4 }} /> <b>Artist:</b> {song.artist}</CardMeta>
                <CardMeta><b>Album:</b> {song.album || '-'} <FaHeadphones style={{ color: '#43a047', marginLeft: 4 }} /></CardMeta>
                <CardMeta><b>Year:</b> {song.year || '-'} <FaVideo style={{ color: '#ffd600', marginLeft: 4 }} /></CardMeta>
                <CardActions>
                  <ActionBtn onClick={() => openEditModal(song)}><FaEdit /> Edit</ActionBtn>
                  <ActionBtn onClick={() => handleDeleteSong(song.id)}><FaTrash /> Delete</ActionBtn>
                </CardActions>
              </Card>
            ))}
          </Grid>
          {rowIndex < rows.length - 1 && (
            <SnakeSeparator>
              <svg width="100%" height="40" viewBox="0 0 900 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 20 Q 75 0, 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20" stroke="#1976d2" strokeWidth="4" fill="none" />
              </svg>
            </SnakeSeparator>
          )}
        </React.Fragment>
      ))}
      <Pagination>
        <PageBtn onClick={() => setPage(page - 1)} disabled={page === 1}>&lt; Prev</PageBtn>
        <span>Page {page} of {totalPages}</span>
        <PageBtn onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next &gt;</PageBtn>
      </Pagination>
      <FloatingAddBtn onClick={openAddModal}><FaPlus /> Add Song</FloatingAddBtn>
      <AnimatePresence>
        {modalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalCard
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <SongForm
                initialValues={modalEditSong}
                onSubmit={handleFormSubmitModal}
                onCancel={closeModal}
              />
            </ModalCard>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageFade>
  );
};

export default SongManagerPage; 