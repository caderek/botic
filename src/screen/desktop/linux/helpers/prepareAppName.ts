function prepareAppName(wmClass: string) {
  const chunks = wmClass.split(".");

  if (chunks.length === 2) {
    return chunks[0].toLocaleLowerCase();
  }

  if (chunks.length % 2 !== 0) {
    return chunks[chunks.length].toLocaleLowerCase();
  }

  return chunks[chunks.length / 2 - 1].toLocaleLowerCase();
}

export default prepareAppName;
