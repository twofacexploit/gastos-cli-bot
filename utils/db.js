import fs from "fs-extra";

const DIR = "./database";
const FILE = "./database/gastos.json";

export function getGastos() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
  if (!fs.existsSync(FILE)) fs.writeJSONSync(FILE, []);
  return fs.readJSONSync(FILE);
}

export function saveGastos(gastos) {
  fs.writeJSONSync(FILE, gastos, { spaces: 2 });
}
