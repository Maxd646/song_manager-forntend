import React from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;
const Button = styled.button`
  padding: 0.5rem 1.2rem;
  border: none;
  background: #1976d2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SongForm = ({ initialValues = {}, onSubmit, onCancel }) => {
    const safeInitial = initialValues || {};
    const [form, setForm] = React.useState({
        title: safeInitial.title || '',
        artist: safeInitial.artist || '',
        album: safeInitial.album || '',
        year: safeInitial.year || '',
        audio_file: null,
        video_file: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('artist', form.artist);
        formData.append('album', form.album);
        formData.append('year', form.year);
        if (form.audio_file) formData.append('audio_file', form.audio_file);
        if (form.video_file) formData.append('video_file', form.video_file);
        onSubmit(formData, true); // pass true to indicate FormData
    };

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
            />
            <Input
                name="artist"
                placeholder="Artist"
                value={form.artist}
                onChange={handleChange}
                required
            />
            <Input
                name="album"
                placeholder="Album"
                value={form.album}
                onChange={handleChange}
            />
            <Input
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                type="number"
                min="1900"
                max="2100"
                required
            />
            <label>Audio File:
                <Input
                    name="audio_file"
                    type="file"
                    accept="audio/*"
                    onChange={handleChange}
                />
            </label>
            <label>Video File:
                <Input
                    name="video_file"
                    type="file"
                    accept="video/*"
                    onChange={handleChange}
                />
            </label>
            <ButtonRow>
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={onCancel}>Cancel</Button>
            </ButtonRow>
        </Form>
    );
};

export default SongForm; 