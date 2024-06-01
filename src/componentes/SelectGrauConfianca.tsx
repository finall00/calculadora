import { SelectHTMLAttributes } from "react";

export default function SelectGrauConfianca({...props}: SelectHTMLAttributes<HTMLSelectElement>){
    return(
        <select className="block w-96 border border-neutral-300 rounded p-2 mt-3 focus:outline-green-400 hover:border-green-400 text-sm "
         {...props}>
            <option value="">Selecione o Grau de confiança</option>
            <option value="90%">90%</option>
            <option value="95%">95%</option>
            <option value="99%">99%</option>
        </select>
    )
}