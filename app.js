const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbxTM-k4xR7SFtNZDKBWSi3DfyVfqgy_nAO-5rGRBR0Tlz_duSrzzH6TvgpSFDoLldEQRg/exec";

function enviarParaSheets(codigo) {
    const operador = document.getElementById("operador").value || "Sem nome";

    const payload = {
        operador: operador,
        id: codigo,
        dispositivo: navigator.userAgent
    };

    fetch(URL_APPS_SCRIPT, {
        method: "POST",
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Salvo no Sheets:", data);
    })
    .catch(err => {
        console.error("Erro ao salvar:", err);
        alert("Erro ao enviar para o Sheets");
    });
}
