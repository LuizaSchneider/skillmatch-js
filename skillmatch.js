class Vaga {
  constructor(
    empresa,
    cargo,
    compatibilidade,
    habilidadesEncontradas,
    habilidadesFaltantes,
    classificacao,
  ) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.compatibilidade = compatibilidade;
    this.habilidadesEncontradas = habilidadesEncontradas;
    this.habilidadesFaltantes = habilidadesFaltantes;
    this.classificacao = classificacao;
  }
}

const luiza = {
  nome: "Luiza",
  area: "Front-End",
  habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban"],
  tempoDeExperienciaMeses: 3,
};

const vagasDeEmprego = [
  {
    id: 1,
    empresa: "TechStart",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "GitHub", "Lógica de Programação"],
  },
  {
    id: 2,
    empresa: "CodeLab",
    cargo: "Estágio Front-End",
    requisitos: ["JavaScript", "Kanban", "GitHub"],
  },
  {
    id: 3,
    empresa: "WebSolutions",
    cargo: "Programador JavaScript Júnior",
    requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
  },
];
function matchDeHabilidades(habilidades, requisitos) {
  const encontradas = requisitos.filter((req) => habilidades.includes(req));

  const faltantes = requisitos.filter((req) => !habilidades.includes(req));

  const compatibilidade = (encontradas.length / requisitos.length) * 100;

  return {
    encontradas,
    faltantes,
    compatibilidade,
  };
}
function obterClassificacao(percentual) {
  if (percentual >= 80) return "Alta Compatibilidade";
  if (percentual >= 50) return "Média Compatibilidade";
  return "Baixa Compatibilidade";
}

function compararCandidatoVagas(candidato, vagas) {
  const resultados = [];

  for (const vaga of vagas) {
    const match = matchDeHabilidades(candidato.habilidades, vaga.requisitos);

    resultados.push(
      new Vaga(
        vaga.empresa,
        vaga.cargo,
        `${match.compatibilidade.toFixed(0)}%`,
        match.encontradas,
        match.faltantes,
        obterClassificacao(match.compatibilidade),
      ),
    );
  }

  return resultados;
}
function faltaEstudar(candidato, vagas) {
  const contadorMaterias = {};

  for (const vaga of vagas) {
    for (const requisito of vaga.requisitos) {
      if (!candidato.habilidades.includes(requisito)) {
        contadorMaterias[requisito] = (contadorMaterias[requisito] || 0) + 1;
      }
    }
  }

  return Object.entries(contadorMaterias)
    .sort((a, b) => b[1] - a[1])
    .map(([materia, qtd]) => `${materia} (${qtd} vaga(s))`);
}

function gerarRelatorio(candidato, vagas) {
  const resultados = compararCandidatoVagas(candidato, vagas);
  const recomendacoes = faltaEstudar(candidato, vagas);

  console.log("📊 RESULTADO DAS VAGAS:\n");
  console.log(resultados);

  console.log("\n📚 RECOMENDAÇÃO DE ESTUDO:\n");

  if (recomendacoes.length === 0) {
    console.log("Você já atende todas as exigências das vagas!");
  } else {
    console.log("Priorize estudar:");
    recomendacoes.forEach((item) => console.log("- " + item));
    console.log("pois esses conteúdos aparecem nas vagas analisadas.");
  }
}

gerarRelatorio(luiza, vagasDeEmprego);
