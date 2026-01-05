import { getGastos } from "../../utils/db.js";
import { porCategoria } from "../../utils/calculos.js";

export default {
  "/categorias": () => {
    const cats = porCategoria(getGastos());
    return Object.entries(cats)
      .map(([c, v]) => `• ${c}: R$ ${v.toFixed(2)}`)
      .join("\n");
  },

  "/categoria": (txt) => {
    const nome = txt.split(" ").slice(1).join(" ");
    const total = getGastos()
      .filter(g => g.categoria === nome)
      .reduce((s, g) => s + g.valor, 0);

    return `📂 ${nome}: R$ ${total.toFixed(2)}`;
  }
};
