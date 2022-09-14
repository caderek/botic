const randomInt = (max: number, min: number) =>
  Math.round(Math.random() * (max - min)) + min;

const randomElement = <T>(arr: T[]): T => {
  const index = randomInt(0, arr.length - 1);
  return arr[index];
};

export { randomInt, randomElement };
