let body = document.querySelector("body");

const chamadoURL = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
  "X-Parse-Application-Id": "GeBwcw2VMlrxjTT5B8NBBsTY16VHEZ1b0VIpAVHj",
  "X-Parse-REST-API-Key": "jBlXabgHNsee2h8uhEXv9MTguNAnQCl8xNXAtUpg",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const getChamados = async () => {
  let url = chamadoURL;
    const whereClause = JSON.stringify({ finalizado: false });
    url = `${url}?where=${whereClause}`;
    url = encodeURI(url);
    console.log("url", url);

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await response.json();
  return data.results;
};

const criarChamados = async () => {
    let chamados = await getChamados();

    for (let i = 0; i < chamados.length; i++) {
        const chamado = chamados[i];
        const div = document.createElement("div");
        div.className = "chamado" 
        const h3 = document.createElement("h3");
        h3.textContent = chamado.assunto;
        const p = document.createElement("p");
        p.textContent = chamado.mensagem;
        const btn = document.createElement("button");
        btn.innerHTML = "Finalizar Chamado";
        btn.onclick = () => handleFinishSupport(textArea.value, chamado);
        const textArea = document.createElement("textarea");
        textArea.rows = 10;
        textArea.cols = 30;
        div.append(h3);
        div.append(p);
        div.append(btn);
        div.append(textArea);
        body.append(div);
    }
}

window.addEventListener("load", async () => {
    criarChamados();
  });

  const handleFinishSupport = async (resposta, chamado) => {
    await fetch(`${chamadoURL}/${chamado.objectId}`, {
      method: "PUT",
      headers: headersJson,
      body: JSON.stringify({ finalizado: true, resposta }),
    });

    criarChamados();
  };