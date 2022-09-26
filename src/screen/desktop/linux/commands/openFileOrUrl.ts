import { execSync } from "node:child_process";

async function open(urlOrFile: string) {
  execSync(`open ${urlOrFile}`);
}

export default open;
