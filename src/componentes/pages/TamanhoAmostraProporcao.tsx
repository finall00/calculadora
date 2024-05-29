import { amostraProporcao } from "@/lib/CalculoAmostraProporcao";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";

export default function TamanhoAmostraProporcao(){

    const [amostraData ,setAmostraData  ] =useState<null | {
        grau:number;
        sucesso:number ;
        erro:number;
      }>(null);

      const [tamanhoAmostra ,setTamanhoAmostra  ] =useState<null | {
        tamanho:number;
        tamanhoRoud:number ;
        sucessoMF: string;
      }>(null);


    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formdata = new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata) as {grau :string, sucesso:string, erro:string};

        const { grau , sucesso , erro} = data;

        if(!grau || !erro){
            alert("Preencha todos os campos")
            return
        }


        const grauNumber = parseFloat(grau.replace(',','.'))
        const sucessoNumber = parseFloat(sucesso.replace(',','.'))
        const erroNumber = parseFloat(erro.replace(',','.'))

        if(isNaN(grauNumber) || isNaN(sucessoNumber) || isNaN(erroNumber) ){
            alert("digite numeros nos campos")
              return
          }


        setAmostraData({
            grau: grauNumber,
            sucesso:sucessoNumber,
            erro:erroNumber
        })

        const amostraResult = amostraProporcao(grauNumber,sucessoNumber,erroNumber)

        setTamanhoAmostra({
            tamanho :amostraResult.tmAmostra,
            tamanhoRoud :amostraResult.tmAmostraRound,
            sucessoMF: amostraResult.sucessoMF
        })
        e.currentTarget.reset();
    }
    function handleReset(e : React.MouseEvent<HTMLButtonElement>){
        e.preventDefault
        setAmostraData(null)
        setTamanhoAmostra(null)
      }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <Input disabled={!! tamanhoAmostra} type="text" id="grau" name="grau" placeholder="Grau de confiança"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="sucesso" name="sucesso" placeholder="Sucesso (P)"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="erro" name="erro" placeholder="Erro (EP)"></Input>
                <Botao type="submit">Calcular</Botao>
                <Botao onClick={handleReset} type="button">Refazer</Botao>
            </form>
            
            {amostraData?(
                <pre>{JSON.stringify(amostraData)}</pre>
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