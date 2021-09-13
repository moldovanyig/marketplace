export function sanitizeString(inputString: string): string {
  inputString = inputString.replace(/[^a-z0-9áéíóúñüűöő \.,_-]/gim, '');
  return inputString.trim();
}
