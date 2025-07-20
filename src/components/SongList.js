import React from 'react';
import styled from '@emotion/styled';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;
const Th = styled.th`
  background: #ececec;
  padding: 0.5rem;
  border: 1px solid #ddd;
`;
const Td = styled.td`
  padding: 0.5rem;
  border: 1px solid #ddd;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
const Button = styled.button`
  padding: 0.3rem 0.7rem;
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
const ActionButton = styled.button`
  padding: 0.3rem 0.7rem;
  border: none;
  background: #43a047;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  &:last-of-type {
    background: #d32f2f;
    margin-right: 0;
  }
`;

const SongList = ({ songs, page, totalPages, onPageChange, onEdit, onDelete }) => {
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <Th>Title</Th>
                        <Th>Artist</Th>
                        <Th>Album</Th>
                        <Th>Year</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr key={song.id}>
                            <Td>{song.title}</Td>
                            <Td>{song.artist}</Td>
                            <Td>{song.album}</Td>
                            <Td>{song.year}</Td>
                            <Td>
                                <ActionButton onClick={() => onEdit(song)}>Edit</ActionButton>
                                <ActionButton onClick={() => onDelete(song.id)}>Delete</ActionButton>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <Button onClick={() => onPageChange(page - 1)} disabled={page === 1}>&lt; Prev</Button>
                <span>Page {page} of {totalPages}</span>
                <Button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next &gt;</Button>
            </Pagination>
        </>
    );
};

export default SongList; 