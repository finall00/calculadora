export function calcularProporcao(quantidade: number, total: number): number{
 
    if(total ===0){
        throw new Error("O total não pode ser zero.");     
    }
    
    return quantidade / total;
}