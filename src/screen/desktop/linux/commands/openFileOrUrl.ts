import { execSync } from "node:child_process";

async function openFileOrUrl(urlOrFile: string) {
  execSync(`open ${urlOrFile}`);
}

export default openFileOrUrl;
