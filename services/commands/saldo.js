import { getGastos } from "../../utils/db.js";
import { total } from "../../utils/calculos.js";
import dayjs from "dayjs";

const LIMITE = Number(process.env.LIMITE_MENSAL || 2000);

export default {
  "/saldo": () => {
    const gastos = getGastos();
    return `💰 Saldo atual: R$ ${(LIMITE - total(gastos)).toFixed(2)}`;
  },

  "/percentual": () => {
    const gastos = getGastos();
    return `📊 ${(total(gastos) / LIMITE * 100).toFixed(1)}% do limite usado`;
  },

  "/orcamento_diario": () => {
    const dias = dayjs().daysInMonth() - dayjs().date();
    const gastos = getGastos();
    return `📅 Pode gastar R$ ${((LIMITE - total(gastos)) / dias).toFixed(2)} por dia`;
  }
};
