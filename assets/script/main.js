import { iniciarBotoesHabilidades, iniciarFormulario } from "./ui.js";
import {
  VagaFrontEnd,
  processarAnalise,
  criarContadorDeAnalises,
} from "./motor.js";

iniciarBotoesHabilidades();
iniciarFormulario();

buscarVagas().then((vagas) => {
  console.log(vagas);
});
