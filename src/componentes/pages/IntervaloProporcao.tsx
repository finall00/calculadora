import Botao from "../Button";
import Input from "../Input";

export default function IntervaloConfiacaProporcao (){

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as {sucesso:string, grau:string, amostra:string}
    
    const {sucesso, grau, amostra} =data

    if(!sucesso || !grau || !amostra){
        alert("Prencha todos os campos")
        return
    }
  }

    return(
      <div>
        <form onSubmit={handleSubmit}>
            <Input type="text" id="sucesso" name="sucesso" placeholder="Digite o sucesso"/>
            <Input type="text" id="grau" name="grau" placeholder="Grau de confiança"/>
            <Input type="text" id="amostra" name="amostra" placeholder="Tamanho da amostra"/>
            <Botao type="submit">Calcular</Botao>
        </form>
      </div>
    )
}