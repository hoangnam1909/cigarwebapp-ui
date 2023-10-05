export const numberInputOnly = (value) => {
  const re = /^[0-9]*$/;
  if (value === "" || re.test(value)) {
    return true;
  }
  return false;
};
