
// Inefficient implementation in O(n^2), but for
// deduplicating a small set of middlewares it's fine ;)
function dedup (array) {
  const deduplicated = []

  array.forEach((item) => {
    if (deduplicated.indexOf(item) === -1) {
      deduplicated.push(item)
    }
  })

  return deduplicated
}

export { dedup }
