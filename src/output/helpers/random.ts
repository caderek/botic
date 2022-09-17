const randomInt = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const randomElement = <T>(arr: T[]): T => {
  const index = randomInt(0, arr.length - 1);
  return arr[index];
};

export { randomInt, randomElement };
