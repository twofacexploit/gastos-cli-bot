import { getGastos } from "../../utils/db.js";
import { total } from "../../utils/calculos.js";

export default {
  "/resumo": () => {
    const t = total(getGastos());
    return `📊 Total gasto no mês: R$ ${t.toFixed(2)}`;
  },

  "/status": () => {
    const qtd = getGastos().length;
    return `⚙️ Bot ativo\n📦 Lançamentos: ${qtd}`;
  }
};
