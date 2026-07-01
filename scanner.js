let html5QrCode;
let escaneando = false;

const btnCamera = document.getElementById("btnCamera");
const resultado = document.getElementById("resultado");
const contadorEl = document.getElementById("contador");

let contador = 0;

// 🔥 controla duplicado por código
let ultimoCodigo = "";
let bloqueado = false;

btnCamera.addEventListener("click", iniciarScanner);

async function iniciarScanner() {
    if (escaneando) return;

    try {
        html5QrCode = new Html5Qrcode("reader");

        await html5QrCode.start(
            { facingMode: "environment" },
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
        alert("Erro câmera: " + err);
    }
}

function processarCodigo(codigo) {

    codigo = codigo.trim();

    // 🚫 se for o mesmo código da última leitura
    if (codigo === ultimoCodigo) {
        mostrarMensagem("⚠️ Já bipou esse código");
        return;
    }

    ultimoCodigo = codigo;

    resultado.innerText = codigo;

    contador++;
    contadorEl.innerText = contador;

    // 🔊 bip 1 vez só
    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    if (navigator.vibrate) {
        navigator.vibrate(150);
    }

    enviarParaSheets(codigo);

    console.log("Código lido:", codigo);
}

// 📢 mensagem na tela
function mostrarMensagem(msg) {

    let el = document.getElementById("msg");

    if (!el) {
        el = document.createElement("div");
        el.id = "msg";
        el.style.position = "fixed";
        el.style.bottom = "20px";
        el.style.left = "50%";
        el.style.transform = "translateX(-50%)";
        el.style.background = "#ff4444";
        el.style.color = "#fff";
        el.style.padding = "10px 20px";
        el.style.borderRadius = "8px";
        el.style.fontSize = "14px";
        el.style.zIndex = "9999";
        document.body.appendChild(el);
    }

    el.innerText = msg;
    el.style.display = "block";

    setTimeout(() => {
        el.style.display = "none";
    }, 2000);
}
