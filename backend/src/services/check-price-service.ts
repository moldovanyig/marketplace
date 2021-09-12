export const checkPrice = (inputPrice: number): boolean => {
  return Number.isInteger(inputPrice) && inputPrice > 0;
};
