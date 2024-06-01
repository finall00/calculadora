import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export default function Botao({className,children, ...prpos}: ButtonHTMLAttributes<HTMLButtonElement> 
    & {children: React.ReactNode}
    & {className?:string}){
    return(
        <button  className={cn('bg-green-400 border text-lg text-white font-bold p-3 rounded mt-3',className)}{...prpos}>
            {children}
        </button>
    )
}