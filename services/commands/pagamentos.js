import { getGastos } from "../../utils/db.js";

export default {
  "/pagamentos": () => {
    const map = {};
    getGastos().forEach(g => {
      map[g.formaPagamento] = (map[g.formaPagamento] || 0) + g.valor;
    });

    return Object.entries(map)
      .map(([p, v]) => `• ${p}: R$ ${v.toFixed(2)}`)
      .join("\n");
  },

  "/cartao": () => {
    const t = getGastos()
      .filter(g => g.formaPagamento === "Crédito")
      .reduce((s, g) => s + g.valor, 0);

    return `💳 Cartão de crédito: R$ ${t.toFixed(2)}`;
  }
};
