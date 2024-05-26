import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";

export default function IntervaloConfiacaProporcao (){

  const [proporcaoData, setProporcaoData] = useState<null |{
    sucesso :number;
    grau:number;
    amostra:number;
  }>(null)

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as {sucesso:string, grau:string, amostra:string}
    
    const {sucesso, grau, amostra} =data

    if(!sucesso || !grau || !amostra){
        alert("Prencha todos os campos")
        return
    }

    const sucessoNumber = parseFloat(sucesso.replace(',','.'))
    const grauNumber = parseFloat(grau.replace(',','.'))
    const amostraNumber = parseFloat(amostra.replace(',','.'))

    if(isNaN(sucessoNumber) || isNaN(grauNumber) || isNaN(amostraNumber)){
      alert("digite apenas numeros")
      return
    }

      setProporcaoData({
        sucesso: sucessoNumber,
        grau:grauNumber,
        amostra:amostraNumber
      })
  
  }

    return(
      <div>
        <form onSubmit={handleSubmit}>
            <Input type="text" id="sucesso" name="sucesso" placeholder="Digite o sucesso"/>
            <Input type="text" id="grau" name="grau" placeholder="Grau de confiança"/>
            <Input type="text" id="amostra" name="amostra" placeholder="Tamanho da amostra"/>
            <Botao type="submit">Calcular</Botao>

            {proporcaoData ?(
              <pre>{JSON.stringify(proporcaoData)}</pre>
            ):(
              <p>nao existe dados</p>
            )}
        </form>
      </div>
    )
}