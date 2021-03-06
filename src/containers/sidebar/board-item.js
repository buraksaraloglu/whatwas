import React, { useState, useRef, useEffect, useContext } from 'react';
import { Sidebar } from '../../components';
import { Link } from 'react-router-dom';
import { MoreButtonContainer } from './more-button';
import { useSelectedBoardValue } from '../../context';
import { FirebaseContext } from '../../context/firebase';
import { FiFolder } from 'react-icons/fi';

export const BoardItemContainer = React.memo((props) => {
  const board = props.board;
  const active = props.activeBoard;

  const { setSelectedBoard } = useSelectedBoardValue();

  const [listItemModal, setListItemModal] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  let container = useRef(null);

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setAddBoardOpen(false);
    }
  };

  const handleBoardNameChange = (newName) => {};

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <Sidebar.ListItem
        key={board.boardId}
        data-doc-id={board.docId}
        data-testid="board-action"
        role="button"
        tabIndex={0}
        aria-label={`Select ${board.name} as the board`}
        status={active === board.boardId ? 'active' : ''}
      >
        <Link
          key={board.boardId}
          to={'/dashboard/' + board.docId}
          onClick={() => {
            props.clickAction();
            setSelectedBoard(board.boardId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.clickAction();
              setSelectedBoard(board.boardId);
            }
          }}
        >
          <FiFolder />
          <Sidebar.BoardName>
            {board.name ? board.name : 'untitled'}
          </Sidebar.BoardName>
        </Link>
        <MoreButtonContainer board={board} />
      </Sidebar.ListItem>
    </>
  );
});
