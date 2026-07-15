export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  calcularCompatibilidade(habilidadesCandidato) {
    const encontradas = this.requisitos.filter((req) =>
      habilidadesCandidato.includes(req),
    );
    const faltantes = this.requisitos.filter(
      (req) => !habilidadesCandidato.includes(req),
    );
    const percentual = (encontradas.length / this.requisitos.length) * 100;

    return { encontradas, faltantes, percentual };
  }
}

export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, stack) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.stack = stack;
    this.habilidadesPeso = ["JavaScript", "GitHub"];
  }

  calcularCompatibilidade(habilidadesCandidato) {
    const resultadoBase = super.calcularCompatibilidade(habilidadesCandidato);

    const pesoExtra = resultadoBase.encontradas.filter((hab) =>
      this.habilidadesPeso.includes(hab),
    ).length;

    const percentualComPeso = Math.min(
      100,
      resultadoBase.percentual + pesoExtra * 5,
    );

    return { ...resultadoBase, percentual: percentualComPeso };
  }
}

export function processarAnalise(candidato, vagas, aoFinalizar) {
  const resultados = vagas.map((vaga) => {
    const resultado = vaga.calcularCompatibilidade(candidato.habilidades);
    return {
      empresa: vaga.empresa,
      cargo: vaga.cargo,
      ...resultado,
    };
  });

  aoFinalizar(resultados);

  return resultados;
}

export function criarContadorDeAnalises() {
  let total = 0;

  return function contar() {
    total = total + 1;
    return total;
  };
}
