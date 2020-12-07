import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Note } from '../../components';
import { FirebaseContext } from '../../context/firebase';
import 'react-quill/dist/quill.bubble.css';

export const Editor = (props) => {
  let notes = props.note;
  const [currentNote, setCurrentNote] = useState(notes.note);
  const [currentTitle, setCurrentTitle] = useState(notes.noteTitle);
  const [value, setValue] = useState(currentNote);
  const [title, setTitle] = useState(currentTitle);

  const { firebase } = useContext(FirebaseContext);

  const user = JSON.parse(localStorage.getItem('authUser'));

  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleSave = () => {
    if (currentNote !== value || currentTitle !== title) {
      firebase
        .firestore()
        .collection('notes')
        .doc(notes.docId)
        .update({
          noteTitle: title,
          note: value,
          updatedAt: Date.now(),
        })
        .then(() => {
          setCurrentNote(value);
          setCurrentTitle(title);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    notes && (
      <>
        <Note.TitleContainer>
          <Note.Title
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onChange={(e) => {
              setTitle(e.target.value);
              saveButtonTextFunction();
            }}
            color={notes.noteColor}
          >
            {title}
          </Note.Title>
        </Note.TitleContainer>

        <Note.InnerContainer>
          <ReactQuill
            placeholder={'Input'}
            theme="bubble"
            getContent={setValue}
            value={value}
            onChange={setValue}
            ref={editorRef}
            preserveWhitespace={true}
            readOnly={user.uid !== notes.uid}
          />

          <Note.SaveButton onClick={() => handleSave()}>Save</Note.SaveButton>
        </Note.InnerContainer>
      </>
    )
  );
};
