import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Note } from "../types";
import { RootState } from "../app/store";
import {
  fetchAllNotes,
  addNewNote,
  editSingleNote,
  deleteSingleNote,
} from "../api/NotesService";

const initialState = {
  notes: [] as Note[],
  status: "idle",
  error: null as unknown as string | undefined,
};

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.notes = state.notes.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.notes = state.notes.map((item) =>
            item.id === id ? action.payload : item
          );
        }
      });
  },
});

export const selectNotes = (state: RootState) => state.notes.notes;

export const selectNoteById = (state: RootState, noteId: string | undefined) =>
  state.notes.notes.find((note) => note.id === noteId);

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await fetchAllNotes();
  return response;
});

export const addNote = createAsyncThunk("note/addNote", async (note: Note) => {
  const response = await addNewNote(note);
  return response.json();
});

export const editNote = createAsyncThunk(
  "note/editNote",
  async (note: Note) => {
    const response = await editSingleNote(note);
    return response;
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (note: Note) => {
    const response = await deleteSingleNote(note.id);
    return response;
  }
);

export default notesSlice.reducer;
