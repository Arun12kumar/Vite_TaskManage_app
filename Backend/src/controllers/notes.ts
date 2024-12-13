import { RequestHandler } from "express";
import NoteModel from "../models/note"
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res,next) => {
    try{
        // throw Error("English")
        // throw createHttpError(401);
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    }
    catch(error){
        next(error);
    }

}

export const getNote: RequestHandler = async (req, res,next) => {
    const noteId = req.params.noteId;
    
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id")
        }

        const note = await NoteModel.findById(noteId);
        if(!note){
            throw createHttpError(404,"Note not found")
        }
        res.status(200).json(note);
    }
    catch(error){
        next(error);
    }

}

interface CreateNoteBody{
    title? : string,
    discription? : string,
    priority? : string,
    statuss? : string,
    dueDate?:  Date,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const { title, discription, priority, statuss, dueDate } = req.body;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        let parsedDueDate: Date | undefined;
        if (dueDate) {
            parsedDueDate = new Date(dueDate); // Parse the dueDate string into a Date object
            if (isNaN(parsedDueDate.getTime())) {
                throw createHttpError(400, "Invalid due date");
            }
        }

        const newNote = await NoteModel.create({
            title,
            discription,
            priority,
            statuss,
            dueDate: parsedDueDate, // Save the parsed date
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};


interface UpdateNoteParams{
    noteId:string,
}

interface UpdateNoteBody{
    title? : string,
    discription? : string,
    priority? : string,
    statuss? : string,
    dueDate?:  Date,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res,next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newdiscription = req.body.discription;
    const newpriority = req.body.priority;
    const newstatuss = req.body.statuss;
    const newdueDate = req.body.dueDate;
   
    try{
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id")
        }
        if(!newTitle){
            throw createHttpError(400,"Not must have a title")
        }
        
        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(400,"Not must have a note")
        }

        note.title = newTitle;
        note.discription = newdiscription;
        note.priority = newpriority;
        note.statuss = newstatuss;
        note.dueDate = newdueDate;

        const updateNote = await note.save();
        res.status(200).json(updateNote);
    }
    catch(error){
        next(error);
    }

};

export const deleteNotes: RequestHandler = async(req, res, next) =>{
    
    const noteId = req.params.noteId;
    
    try{

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404,"Not found note")
        }

        await note.deleteOne();

        res.sendStatus(204);
    }
    catch(error){
        next(error)
    }
};