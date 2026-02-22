export function pickRandom<T>(items: T[]): T {
  if (items.length === 0) throw new Error("Cannot pick from empty array");
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const index = array[0] % items.length;
  return items[index];
}
