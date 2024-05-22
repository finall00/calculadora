import { ButtonHTMLAttributes } from "react";

export default function Botao({children, ...prpos}: ButtonHTMLAttributes<HTMLButtonElement> & {children: React.ReactNode}){
    return(
        <button {...prpos}>
            {children}
        </button>
    )
}