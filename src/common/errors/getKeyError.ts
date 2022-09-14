const getKeyError = (key: string | Symbol) => {
  return new Error(
    `Key <${String(
      key
    )}> is not defined. For custom keys, use .keycode(code) method.`
  );
};

export default getKeyError;
