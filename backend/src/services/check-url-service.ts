export const checkUrl = (inputULR: string): boolean => {
  return inputULR.match(/\.(jpg|gif|png)$/) != null;
};
