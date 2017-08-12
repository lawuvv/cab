function limpar() {
    document.getElementById('ph').value = "";
    document.getElementById('paco2').value = "";
    document.getElementById('hco3').value = "";
    document.getElementById('area-texto').innerHTML = "";
    document.getElementById('rAguda').checked = false;
    document.getElementById('rCronica').checked = false;
}

function diagnostico() {

    var ph = parseFloat(document.getElementById('ph').value);
    var paco2 = parseFloat(document.getElementById('paco2').value);
    var hco3 = parseFloat(document.getElementById('hco3').value);
    var phHandHass = 6.1 + Math.log10(hco3 / (paco2 * 0.03));
    console.log(phHandHass);

    var checkAguda = document.getElementById('rAguda').checked;
    var checkCronica = document.getElementById('rCronica').checked;
    //console.log();

    var areaTexto = document.getElementById('area-texto');
    var diagn;

    if (!phHandHass) {
        alert("Preencha todos os campos corretamente.");
    }
    else if (document.getElementById('ph').value.includes(",") || document.getElementById('paco2').value.includes(",") || document.getElementById('hco3').value.includes(",")) {
        alert("Utilize \".\" para números decimais.");
    }
    else if(Math.abs(ph - phHandHass) > 0.1) {
        areaTexto.innerHTML = "Gasometria duvidosa. (Verificar calibragem dos aparelhos e os dados coletados do paciente)";
    }
    else{ //Gasometria válida
        if (ph < 7.35) { //ph ácido
            console.log("ph ácido");
            diagn = "PH ácido.";
            if (hco3 < 22 && paco2 > 45) {
                console.log("Distúrbio Misto");
                diagn += " Distúrbio Misto.";
            }
            else if (hco3 < 22) {
                paco2Ini = 40 - (1 * (24 - hco3));
                paco2Fin = 40 - (1.4 * (24 - hco3));
                console.log(paco2Ini);
                console.log(paco2Fin);
                if (paco2 > paco2Fin && paco2 < paco2Ini) {
                    console.log("Acidose Metabólica");
                    diagn += " Acidose Metabólica Simples.";
                }
                else {
                    console.log("Acidose Metabólica associada a Alcalose Respiratória");
                    diagn += " Acidose Metabólica associada a Alcalose Respiratória.";
                }
            }
            else if (paco2 > 45) {
                hco3AgudaIni = 24 - (0.1 * (40 - paco2));
                hco3AgudaFin = 24 - (0.2 * (40 - paco2));
                hco3CronicaIni = 24 - (0.25 * (40 - paco2));
                hco3CronicaFin = 24 - (0.55 * (40 - paco2));
                console.log(hco3CronicaFin + " " + hco3CronicaIni);
                if (!checkAguda && !checkCronica) {
                    alert("Distúrbio respiratório encontrado. Selecione um Quadro Clínico.");
                    areaTexto.innerHTML = "";
                    diagn = "";
                }
                else if ((hco3 > hco3AgudaIni && hco3 < hco3AgudaFin && checkAguda) || (hco3 > hco3CronicaIni && hco3 < hco3CronicaFin && checkCronica)) {
                    console.log("Acidose Respiratória");
                    diagn += " Acidose Respiratória Simples.";
                }
                else {
                    console.log("Acidose Respiratória associada a Alcalose Metabólica");
                    diagn += " Acidose Respiratória associada a Alcalose Metabólica.";
                }
            }
        }
        else if (ph > 7.45) { //ph básico
            console.log("ph básico");
            diagn = "PH básico.";
            if (hco3 > 26 && paco2 < 35) {
                console.log("Distúrbio Misto");
                diagn += " Distúrbio Misto.";
            }
            else if (hco3 > 26) {
                paco2Ini = 40 - (0.4 * (24 - hco3));
                paco2Fin = 40 - (0.9 * (24 - hco3));
                if (paco2 > paco2Fin && paco2 < paco2Ini) {
                    console.log("Alcalose Metabólica");
                    diagn += " Alcalose Metabólica Simples.";
                }
                else {
                    console.log("Alcalose Metabólica associada a Acidose Respiratória");
                    diagn += " Alcalose Metabólica associada a Acidose Respiratória.";
                }
            }
            else if (paco2 < 35) {
                hco3AgudaIni = 24 - (0.2 *(40 - paco2));
                hco3AgudaFin = 24 - (0.25 *(40 - paco2));
                hco3CronicaIni = 24 - (0.4 *(40 - paco2));
                hco3CronicaFin = 24 - (0.5 *(40 - paco2));
                if (!checkAguda && !checkCronica) {
                    alert("Distúrbio respiratório encontrado. Selecione um Quadro Clínico.");
                    areaTexto.innerHTML = "";
                    diagn = "";
                }
                else if ((hco3 > hco3AgudaIni && hco3 < hco3AgudaFin && checkAguda) || (hco3 > hco3CronicaIni && hco3 < hco3CronicaFin && checkCronica)) {
                    console.log("Alcalose Respiratória");
                    diagn += " Alcalose Respiratória Simples.";
                }
                else {
                    console.log("Alcalose Respiratória associada a Acidose Metabólica");
                    diagn += " Alcalose Respiratória associada a Acidose Metabólica.";
                }
            }
        }
        else { //ph normal
            console.log("ph normal");
            diagn = "PH normal.";
        }
        areaTexto.innerHTML = diagn;
    }
}

var pac1 = {ph: 7.25, paco2: 25, hco3: 10.7, rAguda: false, rCronica: false};
var pac2 = {ph: 7.31, paco2: 67.5, hco3: 33, rAguda: false, rCronica: true};
var pac3 = {ph: 7.29, paco2: 61, hco3: 29, rAguda: true, rCronica: false};
var pacientes = [pac1, pac2, pac3];
function preencheForm(v){
    console.log(v);
    document.getElementById("ph").value = pacientes[parseInt(v)].ph;
    document.getElementById("paco2").value = pacientes[parseInt(v)].paco2;
    document.getElementById("hco3").value = pacientes[parseInt(v)].hco3;
    document.getElementById("rAguda").checked = pacientes[parseInt(v)].rAguda;
    document.getElementById("rCronica").checked = pacientes[parseInt(v)].rCronica;
}
