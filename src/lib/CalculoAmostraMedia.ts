export function amostraMedia(grau: number, desvP: number, erroP: number): {amostraM: number, amostraMRound: number}{

    const amostraM = Math.pow(((grau * desvP) / erroP),2);

    let amostraMRound = Math.floor(amostraM);
    amostraMRound++;

return {amostraM, amostraMRound}
// (( grau * desvP)  / erroP)^ 2

}