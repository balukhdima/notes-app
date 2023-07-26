import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type Note } from "../types";
import { Link } from "react-router-dom";
import { fetchNotes, selectNotes } from "../features/notesSlice";
import { RootState, AppDispatch } from "../app/store";
import { TbPlaylistAdd } from "react-icons/tb";

const NotesList = () => {
  const notes = useSelector(selectNotes) as Note[];
  const dispatch: AppDispatch = useDispatch();

  const noteStatus = useSelector((state: RootState) => state.notes.status);

  useEffect(() => {
    if (noteStatus === "idle") {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

  const createNoteSection = useCallback((note: Note, index: number) => {
    return (
      <div
        key={index}
        className="py-4 rounded-lg bg-purple-200  px-4 border-2 border-purple-400 w-96 h-32"
      >
        <Link
          className="hover:text-blue-800 font-medium"
          to={`/note/${note.id}`}
        >
          {note.title}
        </Link>
        <p className="px-2 opacity-50 truncate">{note.description}</p>
      </div>
    );
  }, [notes]);

  return (
    <>
      <h1 className="text-2xl font-bold my-4 ml-16">Notes Manager</h1>
      <Link
        className="flex items-center justify-center fixed bottom-10 right-10 z-10 w-14 h-14 rounded-full place-content-center font-size text-6xl align-top"
        to="/notes/add"
      >
        <TbPlaylistAdd
          size={48}
          className="text-green-500 hover:text-green-700 mr-2"
        />
      </Link>

      <div className="grid gap-4 grid-cols-3 py-8 px-12">
        {notes?.map((note, index) => createNoteSection(note, index)) || "No notes available"} 
      </div>
    </>
  );
};

export default NotesList;
