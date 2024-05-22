import Botao from "../Button";
import Input from "../Input";

export default function IntervaloConfiacaProporcao (){
    return(
      <div>
        <form action="">
            <Input type="text" id="sucesso" name="sucesso" placeholder="Digite o sucesso"/>
            <Input type="text" id="grau" name="grau" placeholder="Grau de confiança"/>
            <Input type="text" id="amostra" name="amostra" placeholder="Tamanho da amostra"/>
            <Botao>C</Botao>
        </form>
      </div>
    )
}