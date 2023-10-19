export const numberInputOnly = (value) => {
  const re = /^[0-9]*$/;
  return !!(value === "" || re.test(value));
};
