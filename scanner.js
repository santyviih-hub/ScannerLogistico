let html5QrCode;
let escaneando = false;
let bloqueado = false;

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
            { facingMode: "environment" }, // câmera traseira (iPhone + Android)
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

    if (bloqueado) return; // 🔥 impede múltiplas leituras seguidas

    bloqueado = true;

    resultado.innerText = codigo;

    contador++;
    contadorEl.innerText = contador;

    // 🔊 som de sucesso
    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    // 📳 vibração (Android / iPhone compatível)
    if (navigator.vibrate) {
        navigator.vibrate(150);
    }

    // 📤 envia para Google Sheets
    enviarParaSheets(codigo);

    console.log("Código lido:", codigo);

    // 🔒 trava por 2 segundos (evita duplicação de leitura da câmera)
    setTimeout(() => {
        bloqueado = false;
    }, 2000);
}
