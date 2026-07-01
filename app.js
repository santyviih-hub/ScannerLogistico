const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbw_F28RXB_ZSuIFPLcrhJ7WGRCevwRuDPqAHhQSC0HH7z5L_oXVmnPvC1pey4v0APRtbA/exec";

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
    .then(res => res.text())
    .then(data => {
        console.log("Resposta Sheets:", data);
    })
    .catch(err => {
        console.error("Erro ao enviar:", err);
    });
}
