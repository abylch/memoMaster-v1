import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteNote } from "./services/apiNote";

function Note({ noteId, onDelete, title, content, time }) {
  console.log("Deleting note props test:");
  const handleClick = () => {
    deleteNote(noteId);
    onDelete(noteId);
  };

  return (
    <div className='note'>
      <h1>{title}</h1>
      <p>{content}</p>

      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <p>{time}</p>
    </div>
  );
}

export default Note;
