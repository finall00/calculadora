export function IntervaloConfProp(sucesso: number, grau: number, amostra: number): {erroP: number, sucessoM: number, erroMenosRound: string, erroMaisRound: string }{

    const sucessoM = 1 - sucesso;
    
    const erroP = grau * (Math.sqrt((sucessoM * sucesso) / amostra));

    var erroMais =  sucesso + erroP;
    var erroMenos = sucesso - erroP;
    // p -erro || p + err
    //sucessoM * raiz((sucessoM * sucesso )/amostra)

    const erroMaisRound:string = erroMais.toFixed(2);
    const erroMenosRound:string = erroMenos.toFixed(2);
    

    return {erroP, sucessoM, erroMenosRound, erroMaisRound};

}