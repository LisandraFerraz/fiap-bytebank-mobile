export const isAmountInvalid = (amount: number) => {
  const ammountParsed = Number(amount);
  if (
    ammountParsed < 1 ||
    ammountParsed === 0 ||
    ammountParsed === null ||
    ammountParsed === undefined ||
    isNaN(amount)
  ) {
    return true;
  }
  return false;
};
