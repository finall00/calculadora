
    import { amostraMedia } from "@/lib/CalculoAmostraMedia";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";

export default function TamanhoAmostraMedia(){

    const [mediaData ,setMediaData  ] =useState<null | {
        grau:number;
        desvP:number;
        erro:number;
      }>(null);

      const [tamanhoAmostra ,setTamanhoAmostra  ] =useState<null | {
        tamanho:number;
        tamanhoRoud:number ;
      }>(null);


    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formdata = new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata) as {grau :string, desvP:string, erro:string};

        const { grau , desvP , erro} = data;

        if(!grau || !desvP || !erro){
            alert("Preencha todos os campos")
            return
        }


        const grauNumber = parseFloat(grau.replace(',','.'))
        const desvPNumber = parseFloat(desvP.replace(',','.'))
        const erroNumber = parseFloat(erro.replace(',','.'))

        if(isNaN(grauNumber) || isNaN(desvPNumber) || isNaN(erroNumber) ){
            alert("digite numeros nos campos")
              return
          }


        setMediaData({
            grau: grauNumber,
            desvP:desvPNumber,
            erro:erroNumber
        })

        const amostraResult = amostraMedia(grauNumber,desvPNumber,erroNumber)

        setTamanhoAmostra({
            tamanho :amostraResult.amostraM,
            tamanhoRoud :amostraResult.amostraMRound,
        })
        e.currentTarget.reset();
    }

    function handleReset(e : React.MouseEvent<HTMLButtonElement>){
        e.preventDefault
        setMediaData(null)
        setTamanhoAmostra(null)
      }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <Input disabled={!! tamanhoAmostra} type="text" id="grau" name="grau" placeholder="Grau de confiança"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="desvP" name="desvP" placeholder="desvio Padrão"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="erro" name="erro" placeholder="Erro (EP)"></Input>
                <Botao type="submit">Calcular</Botao>
                <Botao onClick={handleReset} type="button">Refazer</Botao>
            </form>
            
            {mediaData?(
                <pre>{JSON.stringify(mediaData)}</pre>
            ):(
                <p>nao existe nada</p>
            )}

                        
            {tamanhoAmostra?(
                <pre>{JSON.stringify(tamanhoAmostra)}</pre>
            ):(
                <p>nao existe nada</p>
            )}
        </div>
    )

}