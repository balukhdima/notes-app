import { Note } from "../types";

export const fetchAllNotes = async () => {
  return await fetch(new URL("/notes", process.env.REACT_APP_API_URL))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Wrong response from server");
      }
      return response.json();
    })
    .catch((error) => console.error(error));
};

export const addNewNote = async (note: Note) => {
  return await fetch(new URL("/notes", process.env.REACT_APP_API_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then((response) => {
    alert("Note was successfully created!");
    console.log("response", response);
    return response.json();
  });
};

export const editSingleNote = async (note: Note) => {
  return await fetch(
    new URL(`/notes/${note.id}`, process.env.REACT_APP_API_URL),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  ).then((response) => {
    alert("Note was successfully edited!");

    return response.json();
  });
};

export const deleteSingleNote = async (id: string) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/notes/` + id, {
    method: "DELETE",
  })
    .then((response) => {
      alert("Note was successfully deleted!");

      return response.json();
    })
    .catch((error) => console.error(error));
};
