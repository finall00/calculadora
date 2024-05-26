import { ButtonHTMLAttributes } from "react";

export default function Botao({children, ...prpos}: ButtonHTMLAttributes<HTMLButtonElement> & {children: React.ReactNode}){
    return(
        <button  className="bg-green-400 border text-white font-bold p-3 rounded mt-2" {...prpos}>
            {children}
        </button>
    )
}