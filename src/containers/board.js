import React, { useState, useRef, useEffect } from 'react';
import { useSelectedBoardValue } from '../context';
import { Board } from '../components';
import { getNotes, getTitle } from '../hooks';
import { AddNoteContainer } from './add-note';
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const BoardContainer = () => {
  const [title, setTitle] = useState('Dashboard');
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const { selectedBoard } = useSelectedBoardValue();
  const { notes } = getNotes(selectedBoard);
  const boardTitle = getTitle(selectedBoard);
  const [starred, setStarred] = useState(false);

  let container = useRef(null);

  const handleAddNote = () => {
    setAddNoteOpen(!addNoteOpen);
  };

  if (selectedBoard !== '' && boardTitle !== title) {
    setTitle(boardTitle);
    document.title = `${boardTitle} - WhatWas`;
  }

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setAddNoteOpen(false);
    }
  };

  const handleFavorite = () => {
    setStarred(!starred);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // let options = { year: 'numeric', month: 'long', day: 'numeric', timezone: 'short' };

  return (
    <Board>
      <Board.UpperContainer>
        <Board.Title>{title}</Board.Title>
        <Board.AddNoteButton onClick={handleAddNote}>
          <BiPlus />
          Add Note
        </Board.AddNoteButton>
      </Board.UpperContainer>
      <Board.NoteContainer>
        {notes &&
          notes.map((note) => (
            <Board.NotesList key={note.docId} color={note.noteColor}>
              <Link to={`note/` + note.noteId}>
                <Board.NoteTitle color={note.noteColor}>
                  {note.noteTitle}
                </Board.NoteTitle>

                <Board.LowerContainer>
                  <Board.TagsContainer>
                    {note.tags &&
                      note.tags
                        .slice(0, 3)
                        .map((tag) => <Board.Tag key={tag}>{tag}</Board.Tag>)}
                  </Board.TagsContainer>
                  {/* <Board.Favorite
                  starred={starred}
                  onClick={() => handleFavorite()}
                /> */}
                </Board.LowerContainer>
              </Link>
            </Board.NotesList>
          ))}
        <aside ref={container}>
          {addNoteOpen && <AddNoteContainer action={() => handleAddNote()} />}
        </aside>
      </Board.NoteContainer>
    </Board>
  );
};
