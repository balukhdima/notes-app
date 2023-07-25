import { useDispatch, useSelector } from "react-redux";
import { type Note } from "../types";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { HiHome } from "react-icons/hi";

import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { deleteNote, selectNoteById } from "../features/notesSlice";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentNote = useSelector((state: RootState) =>
    selectNoteById(state, id)
  ) as Note;
  const dispatch: AppDispatch = useDispatch();

  async function handleDelete(note: Note) {
    navigate("/");
    await dispatch(deleteNote(note));
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4 ml-16">Note Details</h1>

      <Link
        className="flex items-center justify-center fixed bottom-10 right-10 z-10 w-14 h-14 rounded-full place-content-center font-size text-6xl align-top"
        to="/"
      >
        <HiHome size={48} className="text-gray-600 hover:text-black mr-2" />
      </Link>

      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-end rounded-t-lg bg-purple-200  px-2 py-2 border-x-2 border-t-2 border-purple-400 h-auto w-6/12">
          <Link to={`/notes/edit/${currentNote.id}`}>
            <FiEdit size={18} className="text-gray-600 hover:text-black mr-2" />
          </Link>
          <button onClick={() => handleDelete(currentNote)}>
            <MdDeleteOutline
              size={18}
              className="text-black hover:text-red-500 mr-2"
            />
          </button>
        </div>

        <div className="py-4 rounded-b-lg bg-purple-200  px-4 border-2 border-purple-400 h-auto w-6/12">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title:</label>
            <div>{currentNote.title}</div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 line-clamp-3">
              Description:
            </label>
            <div className="whitespace-pre-wrap break-words">
              {currentNote.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteView;
