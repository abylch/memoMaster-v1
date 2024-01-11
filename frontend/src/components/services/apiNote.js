import axios from "axios";

export const deleteNote = async (noteId) => {
  try {
    // Assuming your API endpoint for deleting a note is '/api/notes/:id'
    await axios.delete(`/api/notes/${noteId}`);

    // Notify the parent component about the deleted note
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
