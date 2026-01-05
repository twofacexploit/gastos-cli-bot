import { getGastos } from "../../utils/db.js";

export default {
  "/media_diaria": () => {
    const g = getGastos();
    const dias = new Set(g.map(x => x.data)).size || 1;
    const t = g.reduce((s, x) => s + x.valor, 0);
    return `📈 Média diária: R$ ${(t / dias).toFixed(2)}`;
  },

  "/top5": () => {
    return getGastos()
      .sort((a,b) => b.valor - a.valor)
      .slice(0,5)
      .map(g => `• ${g.descricao}: R$ ${g.valor.toFixed(2)}`)
      .join("\n");
  },

  "/ultimo_gasto": () => {
    const g = getGastos().at(-1);
    return g
      ? `🧾 Último gasto: ${g.descricao} – R$ ${g.valor.toFixed(2)}`
      : "Nenhum gasto registrado";
  }
};
