import dayjs from "dayjs";
import { getGastos } from "../../utils/db.js";
import { total } from "../../utils/calculos.js";

export default {
  "/hoje": () => {
    const hoje = dayjs().format("YYYY-MM-DD");
    const t = total(getGastos().filter(g => g.data === hoje));
    return `📆 Hoje: R$ ${t.toFixed(2)}`;
  },

  "/ontem": () => {
    const d = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    const t = total(getGastos().filter(g => g.data === d));
    return `📆 Ontem: R$ ${t.toFixed(2)}`;
  },

  "/semana": () => {
    const t = total(
      getGastos().filter(g =>
        dayjs(g.data).isAfter(dayjs().subtract(7, "day"))
      )
    );
    return `📊 Últimos 7 dias: R$ ${t.toFixed(2)}`;
  },

  "/mes": () => {
    return `📅 Mês atual: R$ ${total(getGastos()).toFixed(2)}`;
  }
};
