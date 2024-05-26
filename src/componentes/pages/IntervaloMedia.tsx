import { useState } from "react";
import { calculateMedia } from "../../lib/CalcMedia";
import Botao from "../Button";
import Input from "../Input";


export default function IntervaloMedia(){


    const [mediaData ,setMediaData  ] =useState<null | {
        media:number;
        grau:number ;
        devspadrao:number;
        amostra:number;
      }>(null);
      
      const [erroData ,setErroMedia  ] =useState<null | {
        erroMedia:number;
        praMenos:string ;
        praMais:string;
      }>(null);
      
      function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
      
        const formdata =  new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata) as {media:string ,grau:string, desvp:string, amostra:string}
      
        const {media ,grau,desvp,amostra}  = data;
      
        if(!media || !grau || !desvp || !amostra){
          alert("Preencha todos os campos")
          return
        }
      
        const mediaNumber = parseFloat(media.replace(',','.'))
        const grauNumber = parseFloat(grau.replace(',','.'))
        const desvpNumber = parseFloat(desvp.replace(',','.'))
        const amostraNumber = parseFloat(amostra.replace(',','.'))
      
   
      
        if(isNaN(mediaNumber) || isNaN(grauNumber) || isNaN(desvpNumber) || isNaN(amostraNumber)){
           
          alert("digite numeros nos campos")
            ClearData()
            return
        }
        setMediaData({
            media: mediaNumber,
            grau: grauNumber,
            devspadrao: desvpNumber,
            amostra: amostraNumber
          })
       //adicionar algumas verificações
      // console.log(Math.sqrt(grauNumber))
        const mediaReult = calculateMedia(mediaNumber,grauNumber,desvpNumber,amostraNumber)
        console.log(mediaReult)
      
        setErroMedia({
          erroMedia :mediaReult.erroM,
          praMenos : mediaReult.varRound1,
          praMais : mediaReult.varRound2
        })
      
      
        console.log(mediaData)
      
        e.currentTarget.reset()
      }
      
      function handleReset(e : React.MouseEvent<HTMLButtonElement>){
        e.preventDefault
        setMediaData(null)
        setErroMedia(null)
      }
      
      function ClearData(){
        setErroMedia(null)
        setMediaData(null)
      }
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <Input type="text" id="media" name="media" placeholder="Media"/>
            <Input type="text" id="grau" name="grau" placeholder="Grau de confiança"/>
            <Input type="text" id="desvp" name="desvp" placeholder="Desvio Padrão"/>
            <Input type="text" name="amostra" placeholder="Amostra"/>
            <Botao type="submit">Calcular</Botao>
            <Botao onClick={handleReset} type="button">Refazer</Botao>
          </form>
          <section>
          {mediaData ? (
                  <pre>{JSON.stringify(mediaData)}</pre>
              ):(
                <p>nada</p>
              )}
    
              {erroData ?(
                <pre>{JSON.stringify(erroData,null,2)}</pre>
              ):(
                <p>erro data nao exixte</p>
              )}
          </section>
             
        </div>
      )
}