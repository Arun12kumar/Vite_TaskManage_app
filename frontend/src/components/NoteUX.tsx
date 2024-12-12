import { Note } from "../models/note"
import { FormatDate } from "../utiles/FormatDate";

interface NoteProps {
    note: Note,
}

const NoteUX = ({note}: NoteProps) => {

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
        trimDueDate = FormatDate(dueDate);
    }else{
        trimDueDate="error"
    }
    

    

    return(
        <div className="bg-emerald-200 w-72 h-fit min-h-72 flex flex-col gap-5 justify-center p-4 rounded-md shadow-lg border-2 border-slate-950">
            
            <div className="text-xl font-bold text-center">{title}</div>
            <div className="flex flex-row gap-2"><label className="font-bold">Description:</label> <p>{discription}</p></div>
            <div className="flex flex-row gap-2"><label className="font-bold">Priority:</label> <p>{priority}</p></div>
            <div className="flex flex-row gap-2"><label className="font-bold">Status:</label> <p>{statuss}</p></div>
            <div className="flex flex-row gap-2"><label className="font-bold">DueDate:</label> <p>{trimDueDate}</p></div>
            <div className="border-t-2 border-slate-950"> <p className="font-medium text-sm">{createUpdatedText}</p></div>
        </div>
    )
}

export default NoteUX