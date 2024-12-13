
import { FormatDate, FormatDateOnly } from "../utiles/FormatDate";
import { BsTrash3Fill } from "react-icons/bs";
import {Note} from "../models/note"

interface NoteProps {
    note: Note,
    onNoteClicked:(note: Note) => void,
    onDeleteNoteClicked: (note: Note) => void,
}

const NoteUX = ({note,onNoteClicked, onDeleteNoteClicked}: NoteProps) => {

    const {
        title,
        discription,
        priority,
        statuss,
        dueDate,
        updatedAt,
        createdAt
    } = note;

    let createUpdatedText:string;
    if(updatedAt>createdAt){
        createUpdatedText = "Updated: " + FormatDate(updatedAt); 
    }else{
        createUpdatedText = "Created: " + FormatDate(createdAt);
    }

    let trimDueDate:string;
    if(dueDate){
        trimDueDate = FormatDateOnly(dueDate);
    }else{
        trimDueDate="error"
    }
    

    

    return(
        <div className="bg-emerald-200 w-72 h-fit min-h-72 flex flex-col gap-5 justify-center p-4 rounded-md shadow-lg border-2 border-slate-950 cursor-pointer"
         onClick={()=>{
            onNoteClicked(note)
         }}>
            
            <div className="text-xl font-bold text-center">{title}</div>
            <div className="flex flex-row gap-2"><label className="font-bold">Description:</label> <p>{discription}</p></div>
            <div className="flex flex-row gap-2"><label className="font-bold">Priority:</label> <p>{priority}</p></div>
            <div className="flex flex-row gap-2"><label className="font-bold">Status:</label> <p>{statuss}</p></div>
            <div className="flex flex-row gap-2"><label className="font-bold">DueDate:</label> <p>{trimDueDate}</p></div>
            <div className="border-t-2 border-slate-950 flex flex-row justify-between p-2"> <p className="font-medium text-sm">{createUpdatedText}</p><p className="cursor-pointer"
                onClick={(e)=>{
                    onDeleteNoteClicked(note)
                    e.stopPropagation();
                }}
            ><BsTrash3Fill /></p></div>
        </div>
    )
}

export default NoteUX