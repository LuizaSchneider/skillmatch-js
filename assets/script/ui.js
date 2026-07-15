import {
  processarAnalise,
  encontrarMelhorVaga,
  gerarRecomendacao,
} from "./motor.js";
import { buscarVagas, salvarPerfil, carregarPerfilSalvo } from "./dados.js";

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

const CLASSIFICACOES = {
  alta: "Alta Compatibilidade",
  media: "Média Compatibilidade",
  baixa: "Baixa Compatibilidade",
};

function obterClassificacao(percentual) {
  if (percentual >= 80) return "alta";
  if (percentual >= 50) return "media";
  return "baixa";
}

function criarCardVaga(resultado, ehMelhorVaga) {
  const card = document.createElement("article");
  const classificacao = obterClassificacao(resultado.percentual);
  card.classList.add("card-vaga", classificacao);
  if (ehMelhorVaga) card.classList.add("melhor-vaga");

  const titulo = document.createElement("h3");
  titulo.textContent = `${resultado.cargo} — ${resultado.empresa}`;
  card.appendChild(titulo);

  if (ehMelhorVaga) {
    const selo = document.createElement("p");
    selo.classList.add("selo-melhor");
    selo.textContent = "⭐ Vaga mais compatível";
    card.appendChild(selo);
  }

  const classificacaoEl = document.createElement("p");
  classificacaoEl.textContent = CLASSIFICACOES[classificacao];
  card.appendChild(classificacaoEl);

  const percentualEl = document.createElement("p");
  percentualEl.textContent = `Compatibilidade: ${resultado.percentual.toFixed(0)}%`;
  card.appendChild(percentualEl);

  const encontradasEl = document.createElement("p");
  encontradasEl.classList.add("habilidades-lista");
  encontradasEl.textContent = `Habilidades encontradas: ${resultado.encontradas.join(", ") || "nenhuma"}`;
  card.appendChild(encontradasEl);

  const faltantesEl = document.createElement("p");
  faltantesEl.classList.add("habilidades-lista");
  faltantesEl.textContent = `Habilidades faltantes: ${resultado.faltantes.join(", ") || "nenhuma"}`;
  card.appendChild(faltantesEl);

  return card;
}

function renderizarResultados(resultados) {
  const container = document.querySelector("#resultados");
  container.innerHTML = "";

  if (resultados.length === 0) {
    const vazio = document.createElement("p");
    vazio.classList.add("estado-mensagem");
    vazio.textContent = "Nada encontrado.";
    container.appendChild(vazio);
    return;
  }

  const melhorVaga = encontrarMelhorVaga(resultados);
  const recomendacao = gerarRecomendacao(resultados);

  const recomendacaoEl = document.createElement("p");
  recomendacaoEl.classList.add("recomendacao");
  recomendacaoEl.textContent = `📚 ${recomendacao}`;
  container.appendChild(recomendacaoEl);

  resultados.forEach((resultado) => {
    const ehMelhorVaga = resultado.id === melhorVaga.id;
    const card = criarCardVaga(resultado, ehMelhorVaga);
    container.appendChild(card);
  });
}

function renderizarCarregando() {
  const container = document.querySelector("#resultados");
  container.innerHTML = "";
  const carregando = document.createElement("p");
  carregando.classList.add("estado-mensagem");
  carregando.textContent = "Carregando vagas...";
  container.appendChild(carregando);
}

function renderizarErro(mensagem) {
  const container = document.querySelector("#resultados");
  container.innerHTML = "";
  const erro = document.createElement("p");
  erro.classList.add("estado-mensagem");
  erro.textContent = mensagem;
  container.appendChild(erro);
}

export function iniciarFormulario() {
  const form = document.querySelector("#formPerfil");
  const mensagemErro = document.querySelector("#mensagemErro");

  form.addEventListener("submit", async (evento) => {
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

    salvarPerfil(candidato);
    renderizarCarregando();

    try {
      const vagas = await buscarVagas();

      processarAnalise(candidato, vagas, (resultados) => {
        renderizarResultados(resultados);
      });
    } catch (erro) {
      renderizarErro("Não foi possível carregar as vagas. Tente novamente.");
    }
  });
}

export function restaurarPerfilSalvo() {
  const perfilSalvo = carregarPerfilSalvo();

  if (perfilSalvo === null) {
    return;
  }

  document.querySelector("#inome").value = perfilSalvo.nome;
  document.querySelector("#iatuacao").value = perfilSalvo.area;
  document.querySelector("#experiencia").value = perfilSalvo.experienciaMeses;

  perfilSalvo.habilidades.forEach((habilidade) => {
    const botao = Array.from(
      document.querySelectorAll('.habilidades-botoes input[type="button"]'),
    ).find((b) => b.value === habilidade);

    if (botao) {
      botao.classList.add("selecionado");
    }
  });
}
