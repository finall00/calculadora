import { useState } from "react"
import IntervaloConfiacaProporcao from "./IntervaloProporcao"
import TamanhoAmostraMedia from "./TamanhoAmostraMedia"
import TamanhoAmostraProporcao from "./TamanhoAmostraProporcao"
import IntervaloMedia from "./IntervaloMedia"

export default function SelectComponent(){


    const [selectData , setSelectData]  = useState<string | null>(null)

    const rederSelectComponent= ()=>{
        switch (selectData) {
            case 'icMedia':
                return <IntervaloMedia></IntervaloMedia>
            case 'icProporcao':
                return <IntervaloConfiacaProporcao></IntervaloConfiacaProporcao>
            case 'tamAmostraMedia':
                return <TamanhoAmostraMedia></TamanhoAmostraMedia>
            case 'tamAmostraProporcao':
                return <TamanhoAmostraProporcao></TamanhoAmostraProporcao>
        }
    }

    return(
        <div>
            <select name="selectComponente"
            className="p-4 rounded outline-none  s backdrop-filter backdrop-blur-md  bg-white/40 shadow-md"
             id="selectComponente"
                value={selectData ?? ''} 
                onChange={(e)=> setSelectData(e.target.value)}
             >
                <option value="">Selecione a operação </option>
                <option value="icMedia">Intervalo de confiança media</option>
                <option value="icProporcao">Intervalo de confiança Proporção</option>
                <option value="tamAmostraMedia">Tamanho da amostra Media</option>
                <option value="tamAmostraProporcao">Tamanho da amostra Proporção</option>
            </select>

            <div>
                {rederSelectComponent()}
            </div>
        </div>
    )
}