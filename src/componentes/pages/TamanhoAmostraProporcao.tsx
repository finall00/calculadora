import { amostraProporcao } from "@/lib/CalculoAmostraProporcao";
import { useState } from "react";
import Botao from "../Button";
import Input from "../Input";
import SelectGrauConfianca from "../SelectGrauConfianca";
import AlertComponent from "../ShowAlert";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

export default function TamanhoAmostraProporcao(){

    const [amostraData ,setAmostraData  ] =useState<null | {
        grau:number;
        sucesso:number ;
        erro:number;
      }>(null);

      const [tamanhoAmostra ,setTamanhoAmostra  ] =useState<null | {
        tamanho:number;
        tamanhoRoud:number ;
        sucessoMF: number;
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
        e.preventDefault()
        setAmostraData(null)
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
                <Input disabled={!! tamanhoAmostra} type="text" id="sucesso" name="sucesso" placeholder="Sucesso (P)"></Input>
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
                                <TableCell>Sucesso</TableCell>
                                <TableCell>{amostraData?.sucesso}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>1-P</TableCell>
                                <TableCell>{tamanhoAmostra?.sucessoMF}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Grau de confiança</TableCell>
                                <TableCell>{amostraData?.grau}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Erro Proporção(Ep)</TableCell>
                                <TableCell>{amostraData?.erro}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Tamanho Amostra</TableCell>
                                <TableCell>{tamanhoAmostra?.tamanho}</TableCell>
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