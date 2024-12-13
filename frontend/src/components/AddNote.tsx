
import { IoClose } from "react-icons/io5";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/note_api";
import * as NoteApi from "../network/note_api";


interface AddnoteDialogProps{
    noteToEdit?: Note,
    onNoteSaved: (note: Note) => void,
    onDismiss: () => void,
}


const AddNote = ({onDismiss,noteToEdit,onNoteSaved}: AddnoteDialogProps)  => {

    
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            discription: noteToEdit?.discription || "",
            priority: noteToEdit?.priority || "",
            statuss: noteToEdit?.statuss || "",
            dueDate: noteToEdit?.dueDate || "",

        }
    });

    async function onSubmit(input:NoteInput) {
        try{

            let noteResponse: Note;
            if(noteToEdit){
                noteResponse = await NoteApi.updateNote(noteToEdit._id, input)
            }else{
                 noteResponse = await NoteApi.createNote(input);
            }

            onNoteSaved(noteResponse); 
        }
        catch(error){
            console.error(error)
        }
    }


    return (
        <div>

            <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-emerald-200 w-80 h-fit min-h-72  p-4 rounded-md shadow-lg border-2 border-slate-950">

                <form className="flex flex-col gap-4 justify-center" id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row gap-3 justify-between"><p className="text-2xl font-semibold">{noteToEdit ? "Edit Task": "Add Task"}</p ><p className="text-2xl cursor-pointer" ><IoClose onClick={onDismiss}/></p></div>
                    <div className="flex flex-row gap-3"><label >Title</label><input type="text" className={`rounded-md ${errors.title ? "border-red-500" : ""}`}  {...register("title", {required:"Required"})} />
                    {errors.title && (<p className="text-red-500 text-sm">{errors.title.message}</p>)}</div>
                    <div className="flex flex-row gap-3"><label >Discription</label><textarea cols={20} rows={3} className="rounded-md" {...register("discription")}></textarea></div>
                    <div className="flex flex-row gap-3"><label >Priority</label><input type="text" className="rounded-md" {...register("priority")}/></div>
                    <div className="flex flex-row gap-3"><label >Status</label><input type="text"  className="rounded-md" {...register("statuss")}/></div>
                    <div className="flex flex-row gap-3"><label >DueDate</label><input type="date"  className="rounded-md" {...register("dueDate",{required:"Required"})}/></div>
                    <div ><button className=" hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-orange-400 " type="submit" form="addNoteForm"  disabled={isSubmitting}>Save</button></div>
                </form>
            </div>
            
        </div>
    )
}

export default AddNote