import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function Note(props) {
  console.log("Deleting note props test:", props);
  const handleClick = async () => {
    try {
      // Assuming your API endpoint for deleting a note is '/api/notes/:id'
      await axios.delete(`/api/notes/${props.noteId}`);

      // Notify the parent component about the deleted note
      props.onDelete(props.noteId);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      
      <button onClick={handleClick}>
        <DeleteIcon/>
      </button>
      <p>{props.time}</p>
    </div>
  );
}

export default Note;
