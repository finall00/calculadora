
    import { amostraMedia } from "@/lib/CalculoAmostraMedia";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";
import SelectGrauConfianca from "../SelectGrauConfianca";
import AlertComponent from "../ShowAlert";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

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


        // const grauNumber = parseFloat(grau.replace(',','.'))
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
        e.preventDefault()
        setMediaData(null)
        setTamanhoAmostra(null)
      }

      const handleAlertClose = () => {
        setAlertMessage(''); // Reset the alert message when the dialog is closed
    };

    return (
        <div className="flex items-center  backdrop-filter backdrop-blur-md  bg-white/40 p-16 mt-2  rounded-xl shadow-md">
            <div className="flex gap-16">
            <form onSubmit={handleSubmit} >
                <SelectGrauConfianca disabled={!!tamanhoAmostra} id="grau" name="grau"/>
                <Input disabled={!! tamanhoAmostra} type="text" id="desvP" name="desvP" placeholder="desvio Padrão"></Input>
                <Input disabled={!! tamanhoAmostra} type="text" id="erro" name="erro" placeholder="Erro (EP)"></Input>
                {tamanhoAmostra?(
                    <Botao className="w-full" onClick={handleReset} type="button">Refazer</Botao>
                    ): (
                    <Botao className="w-full" type="submit">Calcular</Botao>
                )}
            </form>
                {alertMessage && <AlertComponent message={alertMessage} onClose={handleAlertClose}/>}
                {tamanhoAmostra &&(
                    <section className="flex items-center border border-neutral-400/40 rounded-lg">
                    <div className="m-6">
                    <Table className="" >
                            <TableBody className="text-base ">
                                <TableRow className="">
                                <TableCell>Desvio Padrão</TableCell>
                                <TableCell>{mediaData?.desvP}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Grau de confiança</TableCell>
                                <TableCell>{mediaData?.grau}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Desvio Padrãp</TableCell>
                                <TableCell>{mediaData?.desvP}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Erro media(Em)</TableCell>
                                <TableCell>{mediaData?.erro}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Tamanho Amostra</TableCell>
                                <TableCell>{tamanhoAmostra?.tamanho.toFixed(2)}</TableCell>
                                <TableCell>&lt; μ &lt;</TableCell>
                                <TableCell>{tamanhoAmostra?.tamanhoRoud}</TableCell>
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