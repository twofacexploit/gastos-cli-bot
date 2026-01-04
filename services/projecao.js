import fs from "fs-extra";
import { total } from "../utils/calculos.js";
import dayjs from "dayjs";

const DB = "./database/gastos.json";

export function projecao() {
  const gastos = fs.readJSONSync(DB);
  const diasPassados = dayjs().date();
  const totalAtual = total(gastos);
  const proj = (totalAtual / diasPassados) * 30;

  console.log(`📈 Projeção mensal: R$ ${proj.toFixed(2)}`);
}
