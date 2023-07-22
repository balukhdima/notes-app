import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotesList, NoteView, Footer, AddEditNoteForm } from "../components";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen font-serif bg-purple-100 ">
        <main className="flex-grow">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NotesList />} />
              <Route path="/note/:id" element={<NoteView />} />
              <Route path="/notes/add" element={<AddEditNoteForm />} />
              <Route path="/notes/edit/:id" element={<AddEditNoteForm />} />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
