export function amostraProporcao(grau: number, sucesso: number, erroP: number): {tmAmostra: number, tmAmostraRound: number}{
 
    const sucessoM = 1 - sucesso;

    const tmAmostra = ((sucesso * sucessoM) * grau) / (erroP*erroP);

    //(P * (1-p) * grau )/  erro ^2

    const tmAmostraRound = Math.round(tmAmostra);

    return {tmAmostra, tmAmostraRound}
}