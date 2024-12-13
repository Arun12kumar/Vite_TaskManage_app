import { Note } from "../models/note";
import { User } from "../models/user";

const fetchData = async (input:RequestInfo, init?:RequestInit) => {
    
    const response = await fetch(input,init);
    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

//code for signin, login,logout//
export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", {method: "GET"});
    return response.json();
    
}

export interface SignUpCredentials{
    username: string,
    email: string,
    password: string,
}

export async function signUp(credntials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credntials),
        }
    );
    return response.json();
    
}

export interface LogInCredentials{
    username: string,
    password: string,
}

export async function login(credntials: LogInCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credntials),
        }
    );
    return response.json();
    
}

export async function logout() {
    await fetchData("/api/users/logout", {method:"POST"})
}

//code for taskmanagment app//
export const fetchNotes = async ():Promise<Note[]> => {
    const response = await fetchData("/api/notes", {method:"GET"})
    return response.json();
}

export interface NoteInput{
    title : string,
    discription? : string,
    priority? : string,
    statuss? : string,
    dueDate?:  string,
}

export const createNote = async (note: NoteInput):Promise<Note> => {
    const response = await fetchData("/api/notes", 
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });

        return response.json();
    
}

export async function updateNote(noteId:string, note:NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId, 
        {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });

        return response.json();
}

export async function deleteNote(noteId:string) {
    await fetchData("/api/notes/" + noteId, {method: "DELETE"});
}