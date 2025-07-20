import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchSongs, setSongs, addSong, updateSong, deleteSong } from './songSlice';

const API_BASE_URL = 'http://localhost:8000/api/songs/';

function* fetchSongsSaga() {
  const response = yield call(axios.get, API_BASE_URL);
  yield put(setSongs(response.data));
}

function* addSongSaga(action) {
  yield call(axios.post, API_BASE_URL, action.payload);
  yield put(fetchSongs());
}
function* updateSongSaga(action) {
  yield call(axios.put, `${API_BASE_URL}${action.payload.id}/`, action.payload);
  yield put(fetchSongs());
}
function* deleteSongSaga(action) {
  yield call(axios.delete, `${API_BASE_URL}${action.payload}/`);
  yield put(fetchSongs());
}

export default function* rootSaga() {
  yield takeEvery(fetchSongs.type, fetchSongsSaga);
  yield takeEvery(addSong.type, addSongSaga);
  yield takeEvery(updateSong.type, updateSongSaga);
  yield takeEvery(deleteSong.type, deleteSongSaga);
}