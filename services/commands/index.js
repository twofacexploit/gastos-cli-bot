import add from "./add.js";
import saldo from "./saldo.js";
import resumo from "./resumo.js";
import periodos from "./periodos.js";
import categorias from "./categorias.js";
import pagamentos from "./pagamentos.js";
import comparacoes from "./comparacoes.js";
import manutencao from "./manutencao.js";

export default {
  ...saldo,
  ...resumo,
  ...periodos,
  ...categorias,
  ...pagamentos,
  ...comparacoes,
  ...manutencao,
  ...add
};
