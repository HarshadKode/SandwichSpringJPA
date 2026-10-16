const EMOJI: Record<string, string> = {
  vlees: '🥩',
  kip: '🍗',
  kaas: '🧀',
  vis: '🐟',
  specials: '⭐',
  vegetarisch: '🥬',
};

/** A fitting emoji for a sandwich category (Dutch menu names), 🥪 for anything else. */
export function categoryEmoji(category: string | undefined): string {
  return EMOJI[(category ?? '').trim().toLowerCase()] ?? '🥪';
}
