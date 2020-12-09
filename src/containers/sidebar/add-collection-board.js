import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../components';
import { FirebaseContext } from '../../context/firebase';
import { generatePushId } from '../../helpers';

export const AddCollectionBoardContainer = (props) => {
  const [listItemModal, setListItemModal] = useState(false);
  const [addBoardTitle, setAddBoardTitle] = useState('');
  const collection = props.collectionId;

  // Firebase context
  const { firebase } = useContext(FirebaseContext);

  // Ref for modal container
  let addboardref = useRef(null);

  // Modal open
  const handleMoreButton = () => {
    setListItemModal(!listItemModal);
  };

  // Click outside function
  const handleClickOutside = (event) => {
    if (addboardref.current && !addboardref.current.contains(event.target)) {
      setListItemModal(false);
      props.action();
    }
  };

  // Handle modal click outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // Getting user id
  const user = JSON.parse(localStorage.getItem('authUser')).uid;

  // Generate board id
  const boardId = generatePushId();

  // Add board to collection
  let history = useHistory();
  const handleAddBoard = async () => {
    const boardTitle = addBoardTitle !== '' ? addBoardTitle : 'untitled';

    await firebase
      .firestore()
      .collection('boards')
      .add({
        boardId: boardId,
        name: boardTitle,
        uid: user,
        hasDeleted: false,
        visibility: '',
        collectionId: collection.collectionId,
        updatedAt: Date.now(),
      })
      .then(() => {
        let currBoards = [...collection.boardIds, boardId];
        firebase
          .firestore()
          .collection('collection')
          .doc(collection.docId)
          .update({
            boardIds: currBoards,
          })
          .catch((error) => console.error(error));
        props.action();
        setAddBoardTitle('');
        history.push(`/dashboard/${boardId}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal>
      <aside ref={addboardref}>
        <Modal.Inner modalType="add-item">
          <Modal.Input
            type=""
            placeholder="Board Title"
            value={addBoardTitle}
            onChange={(e) => setAddBoardTitle(e.target.value)}
          />
          <Modal.ButtonsContainer>
            <Modal.ConfirmButton
              type="button"
              onClick={() => {
                handleAddBoard();
              }}
            >
              Confirm
            </Modal.ConfirmButton>
            <Modal.Cancel onClick={props.action}>Cancel</Modal.Cancel>
          </Modal.ButtonsContainer>
        </Modal.Inner>
      </aside>
    </Modal>
  );
};
