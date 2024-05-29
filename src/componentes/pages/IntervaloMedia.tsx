import { useState } from "react";
// import { calculateMedia } from "../../lib/CalcMedia";
import { Table, TableBody, TableCell, TableRow } from "@/componentes/ui/table";
import { calculateMedia } from "@/lib/IntervaloConfiancaMedia";
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
      
        e.currentTarget.reset();
      }
      
      function handleReset(e : React.MouseEvent<HTMLButtonElement>){
        e.preventDefault
        setMediaData(null)
        setErroMedia(null)
      }

      function ResetData(){
        setMediaData(null)
        setErroMedia(null)
      }

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <Input disabled={!!erroData} type="text" id="media" name="media" placeholder="Media"/>
            <Input disabled={!!erroData} type="text" id="grau" name="grau" placeholder="Grau de confiança"/>
            <Input disabled={!!erroData} type="text" id="desvp" name="desvp" placeholder="Desvio Padrão"/>
            <Input disabled={!!erroData} type="text" id="amostra" name="amostra" placeholder="Amostra"/>
            {/* {erroData ? (
                  <Botao onClick={ResetData} type="button">Refazer</Botao>
            ):(
              <Botao type="submit">Calcular</Botao>
            )} */}
              <Botao type="submit">Calcular</Botao>
              <Botao onClick={handleReset} type="button">Refazer</Botao>
          </form>

          {erroData &&(
             <section className="mt-3">
             <div className="border border-neutral-300 rounded-lg p-4">
             <Table >
                      <TableBody>
                        <TableRow>
                          <TableCell>Media</TableCell>
                          <TableCell>{mediaData?.media}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Grau de confiança</TableCell>
                        <TableCell>{mediaData?.grau}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Desvio Padrãp</TableCell>
                        <TableCell>{mediaData?.devspadrao}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Tamanho Amostra</TableCell>
                        <TableCell>{mediaData?.amostra}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Erro Media(Em)</TableCell>
                        <TableCell>{erroData?.erroMedia.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Intervalo de confiança</TableCell>
                        <TableCell>{erroData?.praMenos}</TableCell>
                        <TableCell>&lt; μ &lt;</TableCell>
                        <TableCell>{erroData?.praMais}</TableCell>
                        </TableRow>
                      </TableBody>
                  </Table>
             </div>
           </section>
                  
              )}
             
        </div>
      )
}