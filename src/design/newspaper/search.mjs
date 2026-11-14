// Search titles and summaries locally. Whole words avoid “AI” matching “said”.
export function normalise(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en-GB').replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
export function searchWriting(items, query) {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (!terms.length) return [];
  return items.map((item, order) => {
    const title = normalise(item.title);
    const titleWords = title.split(' ');
    const words = new Set(`${title} ${normalise(item.description)}`.split(' '));
    if (!terms.every(term => words.has(term))) return null;
    const score = terms.reduce((sum, term) => sum + (titleWords.includes(term) ? 3 : 0), 0) + (title.includes(terms.join(' ')) ? 5 : 0);
    return { item, score, order };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order).map(result => result.item);
}
