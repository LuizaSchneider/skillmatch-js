export function iniciarBotoesHabilidades() {
  const limiteHabilidades = 5;
  const botoes = document.querySelectorAll(
    '.habilidades-botoes input[type="button"]',
  );

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const jaSelecionado = botao.classList.contains("selecionado");

      const selecionados = document.querySelectorAll(
        '.habilidades-botoes input[type="button"].selecionado',
      );

      if (!jaSelecionado && selecionados.length >= limiteHabilidades) {
        alert(
          `Você já selecionou o máximo de ${limiteHabilidades} habilidades.`,
        );
        return;
      }

      botao.classList.toggle("selecionado");
    });
  });
}

export function iniciarFormulario() {
  const form = document.querySelector("#formPerfil");
  const mensagemErro = document.querySelector("#mensagemErro");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("#inome").value;
    const area = document.querySelector("#iatuacao").value;
    const experiencia = document.querySelector("#experiencia").value;
    const experienciaMeses = Number(experiencia);

    const botoesSelecionados = document.querySelectorAll(
      '.habilidades-botoes input[type="button"].selecionado',
    );
    const habilidades = Array.from(botoesSelecionados).map(
      (botao) => botao.value,
    );

    if (nome.trim() === "") {
      mensagemErro.textContent = "Preencha seu nome.";
      return;
    }

    mensagemErro.textContent = "";

    const candidato = {
      nome,
      area,
      habilidades,
      experienciaMeses,
    };

    console.log(candidato);
  });
}
