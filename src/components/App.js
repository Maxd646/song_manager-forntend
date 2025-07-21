import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, addSong, updateSong, deleteSong } from '../redux/songSlice';
import styled from '@emotion/styled';
import SongList from './SongList';
import SongForm from './SongForm';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@emotion/react';
import Toast from './Toast';
import AuthModal from './AuthModal';
import LandingPage from './LandingPage';
import SongManagerPage from './SongManagerPage';
import axios from 'axios';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  flex: 1 0 auto;
  color: ${({ theme }) => theme.text};
  transition: background 0.3s, color 0.3s;
`;
const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const SONGS_PER_PAGE = 5;

const AddButton = styled.button`
  display: block;
  margin: 0 auto 1.5rem auto;
  padding: 0.6rem 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
`;

const App = ({ themeMode, toggleTheme }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list);
  const [page, setPage] = React.useState(1);
  const [showForm, setShowForm] = React.useState(false);
  const [editSong, setEditSong] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [authModal, setAuthModal] = React.useState(null); // null, 'login', 'register'
  const [authLoading, setAuthLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // On app load, set token if present
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(songs.length / SONGS_PER_PAGE) || 1;
  const paginatedSongs = songs.slice(
    (page - 1) * SONGS_PER_PAGE,
    page * SONGS_PER_PAGE
  );

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const handleAdd = () => {
    setEditSong(null);
    setShowForm(true);
  };
  const handleEdit = (song) => {
    setEditSong(song);
    setShowForm(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('Delete this song?')) {
      dispatch(deleteSong(id));
      setToast({ message: 'Song deleted!', type: 'success' });
    }
  };
  const handleFormSubmit = (data) => {
    if (editSong) {
      dispatch(updateSong({ ...editSong, ...data }));
      setToast({ message: 'Song updated!', type: 'success' });
    } else {
      dispatch(addSong(data));
      setToast({ message: 'Song added!', type: 'success' });
    }
    setShowForm(false);
    setEditSong(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditSong(null);
  };

  const handleLogin = () => setAuthModal('login');
  const handleRegister = () => setAuthModal('register');
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToast({ message: 'Logged out!', type: 'success' });
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  };
  const handleAuthSubmit = async (form) => {
    setAuthError(null);
    if (form.username.length < 3 || form.password.length < 3) {
      setAuthError('Username and password must be at least 3 characters.');
      return;
    }
    setAuthLoading(true);
    try {
      let url, successMsg;
      if (authModal === 'login') {
        url = '/api/auth/login/';
        successMsg = `Logged in as ${form.username}!`;
      } else {
        url = '/api/auth/register/';
        successMsg = `Registered and logged in as ${form.username}!`;
      }
      const res = await axios.post(url, form);
      // Accept either { token: ... } or { access: ... }
      const token = res.data.token || res.data.access;
      if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsLoggedIn(true);
        setToast({ message: successMsg, type: 'success' });
        setAuthModal(null);
      } else {
        setAuthError('Invalid response from server.');
      }
    } catch (err) {
      setAuthError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        'Authentication failed. Please try again.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AppWrapper style={{ background: theme.background, color: theme.text, transition: 'background 0.3s, color 0.3s' }}>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => { setAuthModal(null); setAuthError(null); }}
          onSubmit={handleAuthSubmit}
          error={authError}
          loading={authLoading}
          registerLabel="Sign Up"
          onSwitchMode={mode => setAuthModal(mode)}
        />
      )}
      <Header
        themeMode={themeMode}
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      {!isLoggedIn ? (
        <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <Container theme={theme}>
          <SongManagerPage
            theme={theme}
            showForm={showForm}
            editSong={editSong}
            handleAdd={handleAdd}
            handleFormSubmit={handleFormSubmit}
            handleFormCancel={() => setShowForm(false)}
            paginatedSongs={paginatedSongs}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Container>
      )}
      <Footer />
    </AppWrapper>
  );
};

export default App;