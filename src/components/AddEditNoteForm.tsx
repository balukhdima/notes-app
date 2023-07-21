import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Note } from "../types";
import { addNote, editNote, selectNoteById } from "../features/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { MdDoneOutline, MdOutlineCancel } from "react-icons/md";
import classNames from "classnames";

const formFieldsConfig = {
  required: true,
};

const AddEditNoteForm = () => {
  const navigate = useNavigate();
  const { id: noteId } = useParams();
  const currentNote = (useSelector((state: RootState) =>
    selectNoteById(state, noteId)
  ) || {}) as Note;
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: Note) => {
    if (noteId) {
      dispatch(editNote(data));
      navigate(`/note/${noteId}`);
      return;
    }

    dispatch(addNote(data));
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>({
    values: { ...currentNote },
  });

  const validateClass = classNames({
    "border-red-600": errors.title,
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4 ml-16">
        Note {noteId ? "edit" : "create "}
      </h1>

      <div className="flex justify-center items-center">
        <div className="py-4 rounded-lg bg-purple-200  px-4 border-2 border-purple-400 h-auto w-6/12">
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <label className="block text-gray-700 font-bold mb-2 line-clamp-3">
              Title
            </label>
            <input
              className={`resize-none w-full px-4 py-2 rounded-lg border border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${validateClass}`}
              type="text"
              placeholder="Title..."
              {...register("title", {
                ...formFieldsConfig,
                pattern: /^(?!\s*$).+/,
              })}
            />

            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                ...formFieldsConfig,
                pattern: /^(?!\s*$).+/,
              })}
              rows={5}
              placeholder="Description..."
              className={`resize-none w-full px-4 py-2 rounded-lg border border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${validateClass}`}
            />

            <div className="flex justify-end w-full">
              <button type="submit">
                <MdDoneOutline
                  size={24}
                  className="text-green-600 hover:text-green-800 mr-2"
                />
              </button>

              <Link to="/">
                <MdOutlineCancel
                  size={24}
                  className="text-gray-600 hover:text-black mr-2"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditNoteForm;
