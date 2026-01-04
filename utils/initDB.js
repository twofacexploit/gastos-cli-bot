import fs from "fs-extra";

const DIR = "./database";
const FILE = "./database/gastos.json";

export function initDB() {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  if (!fs.existsSync(FILE)) {
    fs.writeJSONSync(FILE, []);
  }
}
