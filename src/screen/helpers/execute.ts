import { exec } from "node:child_process";

const execute = (command: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      resolve({ out: stdout, err: stderr });
    });
  });
};

export default execute;
