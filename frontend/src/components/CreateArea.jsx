import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  console.log("loggedInUser from add note CreateArea.js: ", loggedInUser);

  const expand = () => {
    setExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  };

  const submitNote = async (event) => {
    event.preventDefault();

    
    try {

      const response = await axios.post("/api/notes", {
        userId: loggedInUser.userId,
        title: note.title,
        content: note.content,
        time: new Date().toISOString() // Add time to the note
      });
      console.log("userId from add note CreateArea.js: ", loggedInUser.userId);

      // Notify the parent component about the new note in App.js <CreateArea onAdd={fetchUserNotes} />
      props.onAdd(response.data);

      // Reset the local note state
      setNote({
        title: "",
        content: ""
      });

      // Collapse the textarea
      setExpanded(false);
    } catch (error) {
      console.error("Error creating note:", error);
      const loggedInUser = localStorage.setItem("user", null);
    }
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <textarea
            maxlength="20" data-limit-row-len="true" rows="1"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onKeyDown={expand}
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
