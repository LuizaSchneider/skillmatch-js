import { VagaFrontEnd } from "./motor.js";

export async function buscarVagas() {
  const resposta = await fetch("./assets/dados/vagas.json");

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as vagas.");
  }

  const dados = await resposta.json();

  return dados.map(
    (vaga) =>
      new VagaFrontEnd(
        vaga.id,
        vaga.empresa,
        vaga.cargo,
        vaga.requisitos,
        vaga.salario,
        vaga.modalidade,
        vaga.stack,
      ),
  );
}
const CHAVE_PERFIL = "skillmatch:perfil";

export function salvarPerfil(candidato) {
  localStorage.setItem(CHAVE_PERFIL, JSON.stringify(candidato));
}

export function carregarPerfilSalvo() {
  const dados = localStorage.getItem(CHAVE_PERFIL);

  if (dados === null) {
    return null;
  }

  return JSON.parse(dados);
}
