import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchSongs, setSongs, addSong, updateSong, deleteSong } from './songSlice';

const API_BASE_URL = 'http://localhost:8000/api/songs/';

const getAuthConfig = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, API_BASE_URL, getAuthConfig());
    yield put(setSongs(response.data));
  } catch (error) {
    console.error("Fetch songs failed:", error);
  }
}

function* addSongSaga(action) {
  try {
    yield call(axios.post, API_BASE_URL, action.payload, getAuthConfig());
    yield put(fetchSongs());
  } catch (error) {
    console.error("Add song failed:", error);
  }
}

function* updateSongSaga(action) {
  try {
    yield call(axios.put, `${API_BASE_URL}${action.payload.id}/`, action.payload, getAuthConfig());
    yield put(fetchSongs());
  } catch (error) {
    console.error("Update song failed:", error);
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `${API_BASE_URL}${action.payload}/`, getAuthConfig());
    yield put(fetchSongs());
  } catch (error) {
    console.error("Delete song failed:", error);
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchSongs.type, fetchSongsSaga);
  yield takeEvery(addSong.type, addSongSaga);
  yield takeEvery(updateSong.type, updateSongSaga);
  yield takeEvery(deleteSong.type, deleteSongSaga);
}
