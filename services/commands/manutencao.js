import { getGastos, saveGastos } from "../../utils/db.js";

export default {
  "/reset_mes": () => {
    saveGastos([]);
    return "🗑️ Todos os gastos foram apagados.";
  },

  "/listar": () => {
    return getGastos()
      .slice(-10)
      .map(g => `• ${g.descricao} – R$ ${g.valor.toFixed(2)}`)
      .join("\n");
  }
};
