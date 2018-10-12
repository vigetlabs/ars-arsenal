/**
 * For the gallery and table view, calculate the delay
 * with which to present items to a user
 */
export function itemAnimationDelay(index: number): string {
  return `${150 + index * 60}ms`
}
