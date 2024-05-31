import { SelectHTMLAttributes } from "react";

export default function SelectGrauConfianca({...props}: SelectHTMLAttributes<HTMLSelectElement>){
    return(
        <select {...props}>
            <option value="">Selecione o Grau de confiança</option>
            <option value="90%">90%</option>
            <option value="95%">95%</option>
            <option value="99%">99%</option>
        </select>
    )
}