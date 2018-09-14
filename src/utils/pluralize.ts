export default function pluralize(word: string): string {
  return word.replace(/s?$/i, 's')
}
