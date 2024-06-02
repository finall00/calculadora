import { useState } from "react";
// import { calculateMedia } from "../../lib/CalcMedia";
import { Table, TableBody, TableCell, TableRow } from "@/componentes/ui/table";
import { calculateMedia } from "@/lib/IntervaloConfiancaMedia";
import Botao from "../Button";
import Input from "../Input";
import SelectGrauConfianca from "../SelectGrauConfianca";
import AlertComponent from "../ShowAlert";


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
      
    const [alertMessage, setAlertMessage] =useState<string|null>(null)
      function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
      
        const formdata =  new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata) as {media:string ,grau:string, desvp:string, amostra:string}
      
        const {media ,grau,desvp,amostra}  = data;
      
        if(!media || !grau || !desvp || !amostra){
          setAlertMessage("Preencha todos os campos")
          return 
        }
        
        let grauNumber;
        switch (grau) {
            case "90%":
                grauNumber = 1.645;
                break;
            case "95%":
                grauNumber = 1.96;
                break;
            case "99%":
                grauNumber = 2.575;
                break;
            default:
                alert("Escolha um grau de confiança válido");
                return;
        }

        const mediaNumber = parseFloat(media.replace(',','.'))
        // const grauNumber = parseFloat(grau.replace(',','.'))
        const desvpNumber = parseFloat(desvp.replace(',','.'))
        const amostraNumber = parseFloat(amostra.replace(',','.'))
      
        
      
        if(isNaN(mediaNumber) || isNaN(grauNumber) || isNaN(desvpNumber) || isNaN(amostraNumber)){
          setAlertMessage("Escreva apenas numeros nos campos")
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
        e.preventDefault()
        setMediaData(null)
        setErroMedia(null)
      }
      const handleAlertClose = () => {
        setAlertMessage(''); // Reset the alert message when the dialog is closed
    };

    return (
        <div className="flex items-center  backdrop-filter backdrop-blur-md  bg-white/40 p-16 mt-2  rounded-xl shadow-md">
          <div className="flex  gap-16">
          <form onSubmit={handleSubmit}>
            <Input disabled={!!erroData} type="text" id="media" name="media" placeholder="Media"/>
            <Input disabled={!!erroData} type="text" id="desvp" name="desvp" placeholder="Desvio Padrão"/>
            <SelectGrauConfianca disabled={!!erroData} id="grau" name="grau"/> 
            <Input disabled={!!erroData} type="text" id="amostra" name="amostra" placeholder="Amostra"/>
            {erroData?(
              <Botao className="w-full" onClick={handleReset} type="button">Refazer</Botao>
            ): (
              <Botao className="w-full" type="submit">Calcular</Botao>
            )}
          </form>
            {alertMessage && <AlertComponent message={alertMessage} onClose={handleAlertClose}/>}
          {erroData &&(
             <section className="flex items-center border border-neutral-400/40 rounded-lg">
             <div className="m-6">
             <Table className="" >
                      <TableBody className="text-base ">
                        <TableRow className="">
                          <TableCell>Média</TableCell>
                          <TableCell>{mediaData?.media}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Grau de confiança</TableCell>
                          <TableCell>{mediaData?.grau}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Desvio Padrãap</TableCell>
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
                 </div>
      )
}