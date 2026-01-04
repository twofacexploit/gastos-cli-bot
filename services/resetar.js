import fs from "fs-extra";

const DB = "./database/gastos.json";

export function resetar() {
  fs.writeJSONSync(DB, []);
  console.log("🗑️ Mês resetado.");
}
