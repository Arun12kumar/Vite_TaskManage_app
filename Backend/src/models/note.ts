import { InferSchemaType, Schema,model } from "mongoose";

const noteSchema = new Schema({
    title: {type: String, required: true},
    discription:{type:String},
    priority:{type:String},
    statuss:{type:String},
    dueDate: { type: Date }
},{timestamps:true});

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note",noteSchema);