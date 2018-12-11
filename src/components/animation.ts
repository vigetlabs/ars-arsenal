/**
 * For the gallery and table view, calculate the delay
 * with which to present items to a user
 */

export function itemAnimationDelay(index: number): number {
  return 100 + index * 45
}
