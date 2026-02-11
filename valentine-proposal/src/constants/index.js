// Shared app constants

export const GIRL_NAME = 'Saloni'
export const BOY_NAME = 'Souvik'
export const BOOK_TITLE = 'We Met Somehow in 8 Billion People'
export const BOOK_AUTHOR = 'Souvik Basu'

export const HEARTS = ['💕', '💗', '💖', '💝', '❤️', '🌸', '💓']

// Find My Heart game
export const HIDING_ICONS = ['🎁', '🎁', '🎁', '🧸', '🧸', '💐', '💐', '☁️', '💌', '🍬', '🧁', '🌹']
export const TOTAL_HEARTS = 3

export function createGameSpots() {
  const icons = [...HIDING_ICONS].sort(() => Math.random() - 0.5)
  const heartIndices = new Set()
  while (heartIndices.size < TOTAL_HEARTS) {
    heartIndices.add(Math.floor(Math.random() * icons.length))
  }
  return icons.map((icon, i) => ({
    id: i,
    icon,
    hasHeart: heartIndices.has(i),
  }))
}

export const VALENTINE_WEEK_DAYS = [
  { id: 'rose', label: 'Rose Day', emoji: '🌹', date: 'Feb 7', active: false },
  { id: 'propose', label: 'Propose Day', emoji: '💍', date: 'Feb 8', active: true },
  { id: 'chocolate', label: 'Chocolate Day', emoji: '🍫', date: 'Feb 9', active: true },
  { id: 'teddy', label: 'Teddy Day', emoji: '🐻', date: 'Feb 10', active: true },
  { id: 'promise', label: 'Promise Day', emoji: '🤝', date: 'Feb 11', active: true },
  { id: 'hug', label: 'Hug Day', emoji: '🤗', date: 'Feb 12', active: false },
  { id: 'kiss', label: 'Kiss Day', emoji: '💋', date: 'Feb 13', active: false },
]

export const REASONS = [
  'Because with you, every ordinary day feels a little more meaningful.',
  'Because you see the best in me even when I don\'t.',
  'Because I want to choose you, and keep choosing you, every day.',
  'Because you make me want to be a better person.',
  'Because "together" is the only place I want to be. 💕',
]

export const PLEAD_MESSAGES = [
  "The No button isn't available! Please click 'I'm convinced!' 🙏",
  "You have to! There's no other way! 😭",
  "There's no way without it! 💔",
  "Please please please click on it! 🙏💕",
]

// Cute teddy images – reliable Unsplash CDN URLs
export const TEDDY_IMAGES = [
  'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1578632292335-df3d6f1136b0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop',
]
