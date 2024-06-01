import { Table, TableBody, TableCell, TableRow } from "@/componentes/ui/table";
import { IntervaloConfProp } from "@/lib/IntervaloConfProporcao";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";
import SelectGrauConfianca from "../SelectGrauConfianca";
import AlertComponent from "../ShowAlert";

export default function IntervaloConfiacaProporcao (){

  const [proporcaoData, setProporcaoData] = useState<null |{
    sucesso :number;
    grau:number;
    amostra:number;
  }>(null)

  const [erroData ,setErroProp ] =useState<null | {
    erroP:string;
    sucessoM: number ;
    erroMenos: string;
    erroMais: string;
  }>(null);
  
  const [alertMessage, setAlertMessage] =useState<string|null>(null)

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as {sucesso:string, grau:string, amostra:string}
    
    const {sucesso, grau, amostra} =data

    if(!sucesso || !grau || !amostra){
        setAlertMessage('Preencha todos os campos')
        return
    }

    const sucessoNumber = parseFloat(sucesso.replace(',','.'))
    const grauNumber = parseFloat(grau.replace(',','.'))
    const amostraNumber = parseFloat(amostra.replace(',','.'))

    if(isNaN(sucessoNumber) || isNaN(grauNumber) || isNaN(amostraNumber)){
      setAlertMessage("digite apenas numeros")
      return
    }

      setProporcaoData({
        sucesso: sucessoNumber,
        grau:grauNumber,
        amostra:amostraNumber
      })


      const PropResult = IntervaloConfProp(sucessoNumber, grauNumber, amostraNumber);
  
    setErroProp({
      erroP : PropResult.erroP.toFixed(2),
      sucessoM: PropResult.sucessoM,
      erroMenos: PropResult.erroMenosRound,
      erroMais: PropResult.erroMaisRound
    })
    console.log(erroData);

    e.currentTarget.reset();
  }

  function handleReset(e : React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    setProporcaoData(null)
    setErroProp(null)
  }

  const handleAlertClose = () => {
    setAlertMessage(''); // Reset the alert message when the dialog is closed
};

    return(
      <div className="flex items-center  backdrop-filter backdrop-blur-md  bg-white/40 p-16 mt-2  rounded-xl shadow-md">
        <div className="flex  gap-16">
        <form onSubmit={handleSubmit}>
            <Input disabled={!! erroData} type="text" id="sucesso" name="sucesso" placeholder="Digite o sucesso"/>
            <SelectGrauConfianca disabled={!!erroData} id="grau" name="grau"/>
            <Input disabled={!! erroData} type="text" id="amostra" name="amostra" placeholder="Tamanho da amostra"/>
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
             <Table >
                      <TableBody className="text-base">
                        <TableRow>
                          <TableCell>Sucesso</TableCell>
                          <TableCell>{proporcaoData?.sucesso}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>1-P</TableCell>
                        <TableCell>{erroData?.sucessoM}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Tamanho da Amostra</TableCell>
                        <TableCell>{proporcaoData?.amostra}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Grau de confiança</TableCell>
                        <TableCell>{proporcaoData?.grau}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Erro Proporção(Em)</TableCell>
                        <TableCell>{erroData?.erroP}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Intervalo de confiança</TableCell>
                        <TableCell>{erroData?.erroMenos}</TableCell>
                        <TableCell>&lt; μ &lt;</TableCell>
                        <TableCell>{erroData?.erroMais}</TableCell>
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