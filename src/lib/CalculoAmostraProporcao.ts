
export function amostraProporcao(grau: number, sucesso: number, erroP: number): {tmAmostra: number, tmAmostraRound: number, sucessoMF: number}{
 
    let sucessoM = 1 - sucesso;

    const tmAmostra = ((sucesso * sucessoM) * Math.pow(grau, 2)) / Math.pow(erroP, 2);

    //(P * (1-p) * grau )/  erro ^2

    let tmAmostraRound = Math.floor(tmAmostra)
    tmAmostraRound++;

    console.log('Valor calculado:',tmAmostra );
    console.log('Valor arredondado:', Math.floor(tmAmostra));

    const sucessoMF =sucessoM;

    return {tmAmostra, tmAmostraRound, sucessoMF}
}