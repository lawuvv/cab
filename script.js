window.onload = init;

var b_calc;

function init(){
    b_calc = document.getElementById("b_calc");
    b_calc.addEventListener("click",processa);
}

function processa(){
    var sodio = Number(document.getElementById("na").value);
    var cloreto = Number(document.getElementById("cl").value);
    var gas_carb = Number(document.getElementById("pco").value);
    var albumina = Number(document.getElementById("alb").value);
    var bicarbonato = Number(document.getElementById("hco").value);
    
    var deltaDiff = calculaDeltaDif(sodio,cloreto);
    var amenos = calculaAmenos(sodio, cloreto, bicarbonato, albumina);
    var deltaalb = calculaDeltaAlb(albumina);
    var hmais = calculaHmais(gas_carb,bicarbonato);
    showResults(deltaDiff,amenos,deltaalb,hmais);
    showDiagnoses(deltaDiff,amenos,deltaalb,hmais);
}

function calculaDeltaDif(s, c){
    return 36 - (s - c);
}

function calculaAmenos(s, c, b, a){
    return s - (c + b + a);
}

function calculaDeltaAlb(a){
    return a - 12;
}

function calculaHmais(g, b){
    return 24*(g/b);
}

function showResults(deltaDiff,amenos,deltaalb,hmais){
    var msg = document.getElementById("out_numbers");
    msg.innerHTML = "<h3>Valores dos índices calculados:</h3> <br>" +
                     "DELTA[DIF]  = " + deltaDiff + "<br>" +
                     "[A-]        = " + amenos + "<br>" +
                     "DELTA[Alb-] = " + deltaalb + "<br>" +
                     "[H+]        = " + hmais + "<br>"
}

function showDiagnoses(deltaDiff,amenos,deltaalb,hmais){
    var msg = document.getElementById("out_diagnoses");
    msg.innerHTML = "<h3>Considerações a partir dos índices</h3> <br>";
    if(hmais > 45){
         msg.innerHTML += "• Acidemia <br>";
    }
    if(hmais < 35){
         msg.innerHTML += "• Alcalemia <br>";
    }
    if(deltaDiff > 0){
        msg.innerHTML += "•	Alcalose iônica <br>";
    }
    if(deltaDiff < 0){
        msg.innerHTML += "•	Acidose iônica <br>";
    }
    if(amenos > 0){
        msg.innerHTML += "•	Acidose metabólica <br>";
    }
    if(amenos < 0){
        msg.innerHTML += "•	Possível erro nos testes <br>";
    }
    if(deltaalb > 0){
        msg.innerHTML += "•	Alcalose metabólica <br>";
    }
    if(deltaalb < 0){
        msg.innerHTML += "•	Acidose metabólica <br>";
    }
}