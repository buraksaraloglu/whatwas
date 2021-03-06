import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

// Component
import { Board } from '../../components';
import { NoteMoreButtonContainer } from '../note/delete';
import { ReadOnlyNote } from './readonly-note';

// Helpers
import { formatDate } from '../../helpers';

// Hooks
import { useSelectedNoteValue } from '../../context';

export const NoteListItem = (props) => {
  const note = props.note;
  const sidebar = props.sidebar;

  // Context
  const { setSelectedNote } = useSelectedNoteValue();

  const noteDate = note.updatedAt;
  return (
    <Board.NotesList sidebarOpen={sidebar} color={note.noteColor}>
      <Link
        to={`/note/${note.boardId}/${note.noteId}`}
        onClick={() => {
          setSelectedNote(note);
        }}
      >
        <Board.NoteTitle color={note.noteColor}>
          {note.noteTitle}
        </Board.NoteTitle>

        <Board.NoteSummary>
          <ReadOnlyNote note={note.noteSummary ? note.noteSummary : ''} />
        </Board.NoteSummary>
        {/* <Board.Favorite
                  starred={starred}
                  onClick={() => handleFavorite()}
                /> */}
      </Link>
      <Board.LowerContainer>
        <Board.NoteUpdatedDate>
          Last update: {formatDate(noteDate)}
        </Board.NoteUpdatedDate>
        <NoteMoreButtonContainer note={note} />
      </Board.LowerContainer>
    </Board.NotesList>
  );
};
