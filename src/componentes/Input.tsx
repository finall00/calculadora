import { InputHTMLAttributes } from "react";

export default function Input({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input className="block w-96 border border-neutral-300 rounded p-2 mt-3 focus:outline-green-400 hover:border-green-400" {...props}
        />
    )
}