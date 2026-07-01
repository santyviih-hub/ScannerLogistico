let html5QrCode;
let escaneando = false;

const btnCamera = document.getElementById("btnCamera");
const resultado = document.getElementById("resultado");
const contadorEl = document.getElementById("contador");

let contador = 0;

btnCamera.addEventListener("click", iniciarScanner);

async function iniciarScanner() {
    if (escaneando) return;

    try {
        html5QrCode = new Html5Qrcode("reader");

        await html5QrCode.start(
            { facingMode: "environment" }, // 📱 câmera traseira (iPhone + Android)
            {
                fps: 10,
                qrbox: 250
            },
            (decodedText) => {
                processarCodigo(decodedText);
            }
        );

        escaneando = true;

    } catch (err) {
        console.error(err);
        alert("Erro ao abrir câmera: " + err);
    }
}

function processarCodigo(codigo) {

    // mostra na tela
    resultado.innerText = codigo;

    // contador
    contador++;
    contadorEl.innerText = contador;

    // som de confirmação
    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    // vibração (Android / alguns iPhones)
    if (navigator.vibrate) {
        navigator.vibrate(150);
    }

    // envia para Google Sheets
    enviarParaSheets(codigo);

    console.log("Código lido:", codigo);
}
