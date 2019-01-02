/**
 * Removes duplicate records from a list, given a field to compare
 * against. This is used to control for duplicate entries returned
 * from API endpoints.
 *
 * Ultimately, we can't control this. However it is important to
 * deduplicate search results for React indexing and user experience.
 */
export function dedupe<Item>(list: Item[], field: keyof Item): Item[] {
  let bank = new Set()
  let next = []

  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i]
    let index = item[field]

    if (bank.has(index) === false) {
      next.push(item)
    }

    bank.add(index)
  }

  return next
}
