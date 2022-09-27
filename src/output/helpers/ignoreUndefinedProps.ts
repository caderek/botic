const ignoreUndefinedProps = (obj: {}) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, val]) => val !== undefined)
  );
};

export default ignoreUndefinedProps;
