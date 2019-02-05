var arrayNonOrdinato = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75, 100].sort(function (a, b) {
    return 0.5 - Math.random();
});
// ordina casualmente l'array

var contatore = 0;
// inizializza l'array

for (i = 0; i < 6; i++)
    $("#seiNumeri").append("<div class='col-2 text-center display-4'>" + arrayNonOrdinato[i] + "</div>");
// aggiunge i primi 6 valori dell'array al div

numeroCasuale = Math.floor(Math.random() * 999);
$("#numeroCasuale").append("<div class='col text-center display-4'>" + numeroCasuale + "</div>");
// genera un numero casuale e lo aggiunge al div

tempoIniziale = performance.now();
// salvo il tempo iniziale (in ms) in una variabile

tentativi = [];
for (tentativo = 0; tentativo < 6; tentativo++) {
    numeriEstratti = arrayNonOrdinato.slice(0, 6).sort((a, b) => b - a);
    // salvo in una variabile i primi 6 valori dell'array

    valoreAttuale = numeriEstratti.splice(tentativo, 1)[0];
    // scelgo il valore iniziale in base al tentativo. inizio ogni volta con un valore diverso e lo rimuovo dall'array

    listaOperazioni = [];
    while (numeriEstratti.length > 0) {
        // per ogni valore rimanente nell'array

        if (valoreAttuale == numeroCasuale) break;
        // se il valore attuale corrisponde al numero da trovare interrompo il ciclo

        vr = [];
        for (k = 0; k < numeriEstratti.length; k++) {
            vr.push(distanzaMinima(numeroCasuale, valoreAttuale, numeriEstratti[k], k));
            // Faccio tutti i calcoli tra il valore attuale e uno dei valori rimanenti nell'array e ritorno per ogni valore dell'array l'operazione con la distanza minore dal numero da trovare
        }
        vr.sort(function (a, b) {
            return a.distanza - b.distanza;
        });
        // ordino in ordine crescente l'array coi risultati delle operazioni

        operazioneDaSvolgere = vr[0].operazione;
        el = numeriEstratti[vr[0].id];
        // 

        numeriEstratti.splice(vr[0].id, 1);
        prevNum = valoreAttuale;
        listaOperazioni.push({
            'operazione': operazioneDaSvolgere,
            'valore': el
        });
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
    }

    tentativi.push({
        'operazioni': listaOperazioni,
        'differenza': Math.abs(numeroCasuale - valoreAttuale),
        'risultato': valoreAttuale,
        'tentativo': tentativo
    });
}
tentativi.sort(function (a, b) {
    return a.differenza - b.differenza;
})

tentativi.sort(function (a, b) {
    if (a.differenza == b.differenza && a.differenza == 0) {
        return a.operazioni.length - b.operazioni.length;
    }
})

valoreInizialeTentativoValido = arrayNonOrdinato.slice(0, 6).sort((a, b) => b - a)[tentativi[0].tentativo];

$("#numeroVicino").append("<div id=\"listaOperazioni\" class='col text-center display-4'>" + valoreInizialeTentativoValido + "</div>");
for (let op of tentativi[0].operazioni) {
    switch (op.operazione) {
        case 'somma':
            simbolo = '+'
            break;
        case 'differenza':
            simbolo = '-'
            break;
        case 'prodotto':
            simbolo = '*'
            break;
        case 'quoziente':
            simbolo = '/'
            break;
    }
    if (simbolo == '*' || simbolo == '/') {
        $("#listaOperazioni").prepend("(");
        $("#listaOperazioni").append(")" + simbolo + op.valore);
    } else {
        $("#listaOperazioni").append(simbolo + op.valore);
    }
}
$("#listaOperazioni").append("=" + tentativi[0].risultato + " (" + tentativi[0].differenza + ")");
$("#cTentativi").append("<div id=\"listaOperazioni\" class='col text-center display-4'>" + contatore + " (" + (performance.now() - tempoIniziale).toFixed(1) + "ms) </div>");


function distanzaMinima(obiettivo, valore, testaCon, id) {
    operazioni = {
        "somma": Math.abs(obiettivo - (valore + testaCon)),
        "differenza": Math.abs(obiettivo - (valore - testaCon)),
        "prodotto": Math.abs(obiettivo - (valore * testaCon)),
        "quoziente": Math.abs((valore % testaCon == 0 ? obiettivo - (valore / testaCon) : Infinity))
    };
    // console.log(operazioni)
    operazione = Object.keys(operazioni).sort(function (a, b) {
        return operazioni[a] - operazioni[b]
    })[0];
    contatore += 3;
    if (operazioni.quoziente != Infinity) contatore++;
    return {
        'operazione': operazione,
        'distanza': operazioni[operazione],
        'id': id
    };
}