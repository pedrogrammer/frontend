export function truncateString(str: string) {
  return str.length > 16 ? str.slice(0, -7) + " ..." : str;
}
