import { useForm } from "react-hook-form"
import { User } from "../models/user"
import { LogInCredentials } from "../network/note_api"
import * as NoteApi from "../network/note_api";
import { IoClose } from "react-icons/io5";


interface LoginModalProps{
    onDismiss: () => void,
    onLoginSucessFul: (user:User) => void,
}

const LoginPage = ({onDismiss, onLoginSucessFul}: LoginModalProps) => {

    const {register, handleSubmit,formState:{errors, isSubmitting} } = useForm<LogInCredentials>();

    async function onSubmit(credentials:LogInCredentials) {
        try {
            const user = await NoteApi.login(credentials);
            onLoginSucessFul(user);
        } catch (error) {
            console.error(error)
        }
    }

  return (

    <div>
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 bg-amber-200 w-80 h-fit min-h-72  p-4 rounded-md shadow-lg border-2 border-slate-950">

            <form className="flex flex-col gap-4 justify-center" id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-3 justify-between"><p className="text-2xl font-semibold">Login</p ><p className="text-2xl cursor-pointer" ><IoClose onClick={onDismiss}/></p></div>
                <div className="flex flex-row gap-3"><label >Username</label><input type="text" className={`rounded-md ${errors.username ? "border-red-500" : ""}`}  {...register("username", {required:"Required"})} />
                {errors.username && (<p className="text-red-500 text-sm">{errors.username.message}</p>)}</div>

                <div className="flex flex-row gap-3"><label >Password</label><input type="password"  className="rounded-md" {...register("password")}/></div>
                <div ><p className="text-center font-bold text-sm">Donot SignUp Go to Signup.</p></div>

                <div ><button className=" hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-blue-400 " type="submit" form="addNoteForm"  disabled={isSubmitting}>Login</button></div>
            </form>
        </div>
    </div>
)
}

export default LoginPage