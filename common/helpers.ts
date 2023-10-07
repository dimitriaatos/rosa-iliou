export const capitalizedFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1)

export const rangeLimit = (num: number, [min, max]: number[]) => {
  if (min > max) [min, max] = [max, min]
  return Math.min(Math.max(num, min), max)
}
