numeroCasuale = 484
baknumeri = [1, 8, 8, 10, 1, 5]
for (aa = 0; aa < baknumeri.length; aa++) {
    numeriEstratti = baknumeri.slice(0)
    numeriEstratti.sort((a, b) => b - a);
    valoreAttuale = numeriEstratti.splice(aa, 1)[0];
    // console.log(numeriEstratti, baknumeri)
    console.log("Partendo da", valoreAttuale)
    while (numeriEstratti.length > 0) {
        i = 0;
        console.log("#################", numeriEstratti)
        vr = []
        for (k = i; k < numeriEstratti.length; k++) {
            vr.push(distanzaMinima(numeroCasuale, valoreAttuale, numeriEstratti[k], k))
        }
        vr.sort(function (a, b) {
            return a.distanza - b.distanza
        })
        operazioneDaSvolgere = vr[0].operazione;
        el = numeriEstratti[vr[0].id]
        numeriEstratti.splice(vr[0].id, 1)
        prevNum = valoreAttuale
        switch (operazioneDaSvolgere) {
            case 'somma':
                valoreAttuale += el;
                break;
            case 'differenza':
                valoreAttuale -= el;
                break;
            case 'prodotto':
                valoreAttuale *= el;
                break;
            case 'quoziente':
                valoreAttuale /= el;
                break;
        }
        console.log(operazioneDaSvolgere, "tra", prevNum, "e", el, "=", valoreAttuale)
        if (valoreAttuale == numeroCasuale) break;
    }
    console.log("Fine, risultato =", valoreAttuale, "numero originale =", numeroCasuale, "(", Math.abs(numeroCasuale - valoreAttuale), ")")
}
// console.log(numeroCasuale, numeriEstratti, valoreAttuale)


function distanzaMinima(obiettivo, valore, testaCon, id) {
    operazioni = {
        "somma": Math.abs(obiettivo - (valore + testaCon)),
        "differenza": Math.abs(obiettivo - (valore - testaCon)),
        "prodotto": Math.abs(obiettivo - (valore * testaCon)),
        "quoziente": Math.abs((valore % testaCon == 0 ? obiettivo - (valore / testaCon) : Infinity))
    }
    // console.log(operazioni)
    operazione = Object.keys(operazioni).sort(function (a, b) {
        return operazioni[a] - operazioni[b]
    })[0]

    return {
        'operazione': operazione,
        'distanza': operazioni[operazione],
        'id': id
    }
}