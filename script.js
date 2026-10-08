const botao = document.getElementById('modo');

botao.addEventListener('click', function () {
    document.body.classList.toggle('black');
});


const botaoIdioma = document.getElementById('idioma');

let idiomaAtual = localStorage.getItem('idioma') || 'pt';


function traduzirSite() {

    const elementos = document.querySelectorAll(
        '[data-pt][data-en]'
    );


    elementos.forEach(function (elemento) {

        if (idiomaAtual === 'en') {

            elemento.textContent =
                elemento.getAttribute('data-en');

        } else {

            elemento.textContent =
                elemento.getAttribute('data-pt');

        }

    });

    const campos = document.querySelectorAll(
        '[data-placeholder-pt][data-placeholder-en]'
    );


    campos.forEach(function (campo) {

        if (idiomaAtual === 'en') {

            campo.placeholder =
                campo.getAttribute('data-placeholder-en');

        } else {

            campo.placeholder =
                campo.getAttribute('data-placeholder-pt');

        }

    });


    if (idiomaAtual === 'en') {

        botaoIdioma.textContent = '🇧🇷 PT-BR';

    } else {

        botaoIdioma.textContent = '🇺🇸 EN';

    }


    localStorage.setItem(
        'idioma',
        idiomaAtual
    );
}

botaoIdioma.addEventListener('click', function () {

    if (idiomaAtual === 'pt') {

        idiomaAtual = 'en';

    } else {

        idiomaAtual = 'pt';

    }

    traduzirSite();

});

traduzirSite();

// ==============================
// ENVIO DO FORMULÁRIO
// ==============================

const formulario = document.getElementById('formulario-contato');
const statusMensagem = document.getElementById('status-mensagem');

formulario.addEventListener('submit', async function (evento) {

    evento.preventDefault();

    const botaoEnviar = document.getElementById('enviar');

    botaoEnviar.disabled = true;

    if (idiomaAtual === "en") {
        botaoEnviar.textContent = "SENDING...";
    } else {
        botaoEnviar.textContent = "ENVIANDO...";
    }

    const dados = new FormData(formulario);

    try {

        const resposta = await fetch(formulario.action, {
            method: "POST",
            body: dados,
            headers: {
                "Accept": "application/json"
            }
        });

        if (resposta.ok) {

            formulario.reset();

            if (idiomaAtual === "en") {
                statusMensagem.textContent = "Message sent successfully!";
            } else {
                statusMensagem.textContent = "Mensagem enviada com sucesso!";
            }

            statusMensagem.style.color = "#4CAF50";

        } else {

            if (idiomaAtual === "en") {
                statusMensagem.textContent = "There was a problem sending your message.";
            } else {
                statusMensagem.textContent = "Ocorreu um problema ao enviar sua mensagem.";
            }

            statusMensagem.style.color = "red";
        }

    } catch (erro) {

        if (idiomaAtual === "en") {
            statusMensagem.textContent = "Connection error. Please try again.";
        } else {
            statusMensagem.textContent = "Erro de conexão. Tente novamente.";
        }

        statusMensagem.style.color = "red";

    }

    botaoEnviar.disabled = false;

    if (idiomaAtual === "en") {
        botaoEnviar.textContent = "SEND →";
    } else {
        botaoEnviar.textContent = "ENVIAR →";
    }

});