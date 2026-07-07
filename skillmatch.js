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

class ResultadoVaga extends Vaga {
  constructor(
    empresa,
    cargo,
    compatibilidade,
    habilidadesEncontradas,
    habilidadesFaltantes,
    classificacao,
    nivel,
  ) {
    super(
      empresa,
      cargo,
      compatibilidade,
      habilidadesEncontradas,
      habilidadesFaltantes,
      classificacao,
    );

    this.nivel = nivel;
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

const calcularCompatibilidade = (encontradas, total) => {
  if (total === 0) return 0;
  return (encontradas.length / total) * 100;
};

const obterClassificacao = (percentual) => {
  if (percentual >= 80) return "Alta Compatibilidade";
  if (percentual >= 50) return "Média Compatibilidade";
  return "Baixa Compatibilidade";
};

function matchDeHabilidades(habilidades, requisitos) {
  const encontradas = requisitos.filter((req) => habilidades.includes(req));

  const faltantes = requisitos.filter((req) => !habilidades.includes(req));

  const compatibilidade = calcularCompatibilidade(
    encontradas,
    requisitos.length,
  );

  return {
    encontradas,
    faltantes,
    compatibilidade,
  };
}

function definirNivelExperiencia(meses) {
  if (meses < 6) return "Iniciante";
  if (meses < 24) return "Júnior";
  return "Pleno";
}

function faltaEstudar(candidato, vagas) {
  const contador = vagas
    .flatMap((vaga) => vaga.requisitos)
    .reduce((acc, requisito) => {
      if (!candidato.habilidades.includes(requisito)) {
        acc[requisito] = (acc[requisito] || 0) + 1;
      }
      return acc;
    }, {});

  return Object.entries(contador)
    .sort((a, b) => b[1] - a[1])
    .map(([materia, qtd]) => `${materia} (${qtd} vaga(s))`);
}

function compararCandidatoVagas(candidato, vagas) {
  const nivel = definirNivelExperiencia(candidato.tempoDeExperienciaMeses);

  const resultados = vagas.map((vaga) => {
    const match = matchDeHabilidades(candidato.habilidades, vaga.requisitos);

    return new ResultadoVaga(
      vaga.empresa,
      vaga.cargo,
      `${match.compatibilidade.toFixed(0)}%`,
      match.encontradas,
      match.faltantes,
      obterClassificacao(match.compatibilidade),
      nivel,
    );
  });

  return resultados;
}

function processarVagas(candidato, vagas, callback) {
  const resultado = compararCandidatoVagas(candidato, vagas);
  callback(resultado);
}

function buscarVagas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagasDeEmprego);
    }, 1000);
  });
}

async function executarAnalise() {
  const vagas = await buscarVagas();

  const resultados = compararCandidatoVagas(luiza, vagas);

  console.log("\n📊 RESULTADO DAS VAGAS:\n");
  console.log(resultados);

  const recomendacoes = faltaEstudar(luiza, vagas);

  console.log("\n📚 RECOMENDAÇÃO DE ESTUDO:\n");

  if (recomendacoes.length === 0) {
    console.log("Você já atende todas as exigências das vagas!");
  } else {
    console.log("Priorize estudar:");
    recomendacoes.forEach((item) => console.log("- " + item));
  }
}

processarVagas(luiza, vagasDeEmprego, (res) => {
  console.log("\n🔁 CALLBACK EXECUTADO:\n");
  console.log(res);
});

executarAnalise();
