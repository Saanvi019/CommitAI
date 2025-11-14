


import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".commitai.json");

export function writeConfig(data) {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Failed to write config:", err);
  }
}

export function readConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return {};
    const content = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("❌ Failed to read config:", err);
    return {};
  }
}

export { CONFIG_PATH };
