import { useEffect, useState } from "react";
import { Note } from "./models/note";
import NoteUX from "./components/NoteUX";
import * as NoteApi from "./network/note_api";
import AddNote from "./components/AddNote";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { User } from "./models/user";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };

    loadNotes();
  }, []);

  async function deleteNote(note: Note) {
    try {
      await NoteApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container-md bg-stone-100 h-fit md:h-screen flex flex-col items-center">
        <Navbar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModel(true)}
          onSignUpClicked={() => setShowSignUpModel(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        {loggedInUser && (
          <div className="flex flex-row gap-5 flex-wrap justify-center p-5 items-center">
            {notes.map((note) => (
              <NoteUX
                note={note}
                key={note._id}
                onDeleteNoteClicked={deleteNote}
                onNoteClicked={setNoteToEdit}
              />
            ))}

            <div className="static">
              {showNote && (
                <AddNote
                  onDismiss={() => setShowNote(false)}
                  onNoteSaved={(newNote) => {
                    setNotes([...notes, newNote]);
                  }}
                />
              )}
              {noteToEdit && (
                <AddNote
                  noteToEdit={noteToEdit}
                  onDismiss={() => setNoteToEdit(null)}
                  onNoteSaved={(updateNote) => {
                    setNotes(
                      notes.map((existingNote) =>
                        existingNote._id === updateNote._id ? updateNote : existingNote
                      )
                    );
                    setNoteToEdit(null);
                  }}
                />
              )}
            </div>

            <button
              onClick={() => setShowNote(true)}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Add Task
            </button>
          </div>
        )}

        {showSignUpModel && (
          <SignUpPage
            onDismiss={() => setShowSignUpModel(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModel(false);
            }}
          />
        )}
        {showLoginModel && (
          <LoginPage
            onDismiss={() => setShowLoginModel(false)}
            onLoginSucessFul={(user) => {
              setLoggedInUser(user);
              setShowLoginModel(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default App;
