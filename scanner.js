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

        const devices = await Html5Qrcode.getCameras();

        if (!devices || devices.length === 0) {
            alert("Nenhuma câmera encontrada");
            return;
        }

        const cameraId = devices[0].id;

        await html5QrCode.start(
            cameraId,
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

    resultado.innerText = codigo;

    contador++;
    contadorEl.innerText = contador;

    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    enviarParaSheets(codigo); // 🔥 AQUI ENVIA PARA O SHEETS
}
    resultado.innerText = codigo;

    contador++;
    contadorEl.innerText = contador;

    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();
}
