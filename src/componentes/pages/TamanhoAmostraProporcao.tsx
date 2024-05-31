import { amostraProporcao } from "@/lib/CalculoAmostraProporcao";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";
import SelectGrauConfianca from "../SelectGrauConfianca";
import AlertComponent from "../ShowAlert";

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

      const [alertMessage, setAlertMessage] =useState<string|null>(null)

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formdata = new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata) as {grau :string, sucesso:string, erro:string};

        const { grau , sucesso , erro} = data;

        if(!grau || !erro){
            setAlertMessage("Preencha todos os campos")
            return
        }


        const grauNumber = parseFloat(grau.replace(',','.'))
        const sucessoNumber = parseFloat(sucesso.replace(',','.'))
        const erroNumber = parseFloat(erro.replace(',','.'))

        if(isNaN(grauNumber) || isNaN(sucessoNumber) || isNaN(erroNumber) ){
            setAlertMessage("digite numeros nos campos")
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

      const handleAlertClose = () => {
        setAlertMessage(''); // Reset the alert message when the dialog is closed
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <SelectGrauConfianca disabled={!!tamanhoAmostra} id="grau" name="grau"/>
                <Input disabled={!! tamanhoAmostra} type="text" id="sucesso" name="sucesso" placeholder="Sucesso (P)"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="erro" name="erro" placeholder="Erro (EP)"></Input>
                <Botao type="submit">Calcular</Botao>
                <Botao onClick={handleReset} type="button">Refazer</Botao>
            </form>
            {alertMessage && <AlertComponent message={alertMessage} onClose={handleAlertClose}/>}
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