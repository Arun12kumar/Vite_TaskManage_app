import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/note_api";
import * as NoteApi from "../network/note_api";
import { IoClose } from "react-icons/io5";



interface SignUpPageProps{
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpPage = ({onDismiss, onSignUpSuccessful}: SignUpPageProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>();

    async function onSubmit(credentials:SignUpCredentials) {
        try{
            const newUser = await NoteApi.signUp(credentials);
            onSignUpSuccessful(newUser)

        }catch(error){
            console.error(error);

        }
        
    }

  return (
    <div>
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-amber-200 w-80 h-fit min-h-72  p-4 rounded-md shadow-lg border-2 border-slate-950">

            <form className="flex flex-col gap-4 justify-center" id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-3 justify-between"><p className="text-2xl font-semibold">SignUp</p ><p className="text-2xl cursor-pointer" ><IoClose onClick={onDismiss}/></p></div>
                <div className="flex flex-row gap-3"><label >Email</label><input type="email" className={`rounded-md ${errors.email ? "border-red-500" : ""}`}  {...register("email", {required:"Required"})} />
                {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}</div>

                <div className="flex flex-row gap-3"><label >UserName</label><input type="text" className="rounded-md" {...register("username")}/></div>
                <div className="flex flex-row gap-3"><label >Password</label><input type="password"  className="rounded-md" {...register("password")}/></div>
                <div ><p className="text-center font-bold text-sm">Already SignUp Go to Login.</p></div>

                <div ><button className=" hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-blue-400 " type="submit" form="addNoteForm"  disabled={isSubmitting}>Sign In</button></div>
            </form>
        </div>
    </div>
  )
}

export default SignUpPage