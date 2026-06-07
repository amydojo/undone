const UPPERCASE_WORDS = new Set(['ai', 'api', 'crm', 'hr', 'roas', 'ui', 'ux'])
const LOWERCASE_WORDS = new Set(['and', 'for', 'in', 'of', 'on', 'or', 'the', 'to'])

function formatWord(word, index) {
  const lower = word.toLowerCase()
  if (UPPERCASE_WORDS.has(lower)) return lower.toUpperCase()
  if (index > 0 && LOWERCASE_WORDS.has(lower)) return lower

  return lower
    .split('-')
    .map((part) => {
      if (UPPERCASE_WORDS.has(part)) return part.toUpperCase()
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join('-')
}

export function formatMetadataLabel(value) {
  if (!value) return ''
  return String(value)
    .split(' ')
    .map(formatWord)
    .join(' ')
}
