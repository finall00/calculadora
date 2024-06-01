export function IntervaloConfProp(sucesso: number, grau: number, amostra: number): {erroPRound: string, sucessoM: number, erroMenosRound: string, erroMaisRound: string }{

    const sucessoM = 1 - sucesso;
    
    let erroP = grau * (Math.sqrt((sucessoM * sucesso) / amostra));

    var erroMais =  sucesso + erroP;
    var erroMenos = sucesso - erroP;
    // p -erro || p + err
    //sucessoM * raiz((sucessoM * sucesso )/amostra)

    const erroMaisRound:string = erroMais.toFixed(2);
    const erroMenosRound:string = erroMenos.toFixed(2);
    
    const erroPRound:string = erroP.toFixed(2);

    return {erroPRound, sucessoM, erroMenosRound, erroMaisRound};

}