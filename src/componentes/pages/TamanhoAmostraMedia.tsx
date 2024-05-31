
    import { amostraMedia } from "@/lib/CalculoAmostraMedia";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";
import SelectGrauConfianca from "../SelectGrauConfianca";
import AlertComponent from "../ShowAlert";

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

      const [alertMessage, setAlertMessage] =useState<string|null>(null)

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formdata = new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata) as {grau :string, desvP:string, erro:string};

        const { grau , desvP , erro} = data;

        if(!grau || !desvP || !erro){
            setAlertMessage("Preencha todos os campos")
            return
        }


        const grauNumber = parseFloat(grau.replace(',','.'))
        const desvPNumber = parseFloat(desvP.replace(',','.'))
        const erroNumber = parseFloat(erro.replace(',','.'))

        if(isNaN(grauNumber) || isNaN(desvPNumber) || isNaN(erroNumber) ){
            setAlertMessage("digite numeros nos campos")
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

      const handleAlertClose = () => {
        setAlertMessage(''); // Reset the alert message when the dialog is closed
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <SelectGrauConfianca disabled={!!tamanhoAmostra} id="grau" name="grau"/>
                <Input disabled={!! tamanhoAmostra} type="text" id="desvP" name="desvP" placeholder="desvio Padrão"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="erro" name="erro" placeholder="Erro (EP)"></Input>
                <Botao type="submit">Calcular</Botao>
                <Botao onClick={handleReset} type="button">Refazer</Botao>
            </form>
            {alertMessage && <AlertComponent message={alertMessage} onClose={handleAlertClose}/>}
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