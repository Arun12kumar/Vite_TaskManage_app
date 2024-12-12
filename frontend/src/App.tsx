import { useEffect, useState } from "react"
import { Note } from "./models/note";
import NoteUX from "./components/NoteUX";



const App = () => {

  
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() =>{
    const loadNotes = async () =>{
      try{
        const response = await fetch("/api/notes", {method:"GET"})
        const notes = await response.json();
        setNotes(notes);

      }
      catch(error){
        console.error(error);
        // alert(error);
      }
    }

    loadNotes()
  },[]);


  return (
    
    <div className="container-md  bg-stone-100 h-screen flex flex-row gap-5 min-w-80 flex-wrap justify-center">
      {notes.map(note =>(
        <NoteUX note={note}key={note._id}/>
      ))}
    </div>
  )
}

export default App



