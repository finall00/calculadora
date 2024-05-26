export function calculateMedia(media:number ,grau:number, desvp:number, amostra:number) : {erroM:number,varRound1:string,varRound2:string}{
    const erroM = grau * (desvp/(Math.sqrt(amostra)));
    
    const var1 = media-erroM;
    const var2 = media+erroM;
  
    const varRound1 = var1.toFixed(2)  // o to fixed tranforma em string , se eu quiser comverter Number(var1.toFixed(2)) ou parseFloat so pra garantir
    const varRound2 = var2.toFixed(2)

    return {erroM, varRound1,varRound2};
}