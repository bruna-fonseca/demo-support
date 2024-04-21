const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("textArea");
let chamado;

const chamadoURL = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
  "X-Parse-Application-Id": "GeBwcw2VMlrxjTT5B8NBBsTY16VHEZ1b0VIpAVHj",
  "X-Parse-REST-API-Key": "jBlXabgHNsee2h8uhEXv9MTguNAnQCl8xNXAtUpg",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const handleOnclick = async ({ email, nome, senha, assunto, mensagem, finalizado }) => {
    await fetch(`${chamadoURL}`, {
      method: "POST",
      headers: headersJson,
      body: JSON.stringify({ email, nome, senha, assunto, mensagem, finalizado }),
    });

    clearInputs();
    window.alert("Chamado aberto!");
  };

let button = document.getElementsByTagName("button");

button[0].addEventListener('click', (e) => {
    chamado = {
        email: inputs[0].value,
        nome: inputs[0].value,
        senha: inputs[1].value,
        assunto: inputs[2].value,
        mensagem: textArea.value,
        finalizado: false
    };
    handleOnclick(chamado);
});


const clearInputs = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    textArea.value = "";
};