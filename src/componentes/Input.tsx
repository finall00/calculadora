import { InputHTMLAttributes } from "react";

export default function Input({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input className="block w-96 border border-neutral-300 rounded p-2 mt-3" {...props}
        />
    )
}