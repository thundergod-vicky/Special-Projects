import { GIRL_NAME, BOY_NAME } from '../constants/index.js'
import { OUR_PICS_URLS } from '../constants/ourPics.js'

export const PAGE_NOTES = [
  'Thank you for being mine, choosing me all over again against all the odds. 💕',
  "That's where our story started. Little did we know where it would take us.",
  'Every moment with you felt like fate. Some things are just meant to be.',
  'Our first adventure together. We\'ve had so many since, and I want so many more.',
  'Laughing till we couldn\'t stop. You\'ve always known how to make me smile.',
  'You became my favourite person. My safe place, my home, my favourite hello.',
  'Two hearts, one story. Ours is my favourite story to tell.',
  'Growing closer every day. I fall for you a little more with each one.',
  'My favourite memory with you. (It\'s hard to pick just one—there are so many.)',
  'Forever grateful for us. For you choosing me, and for every day we get together.',
  'And through it all, you stayed. Thank you for never giving up on us.',
  'This is just the beginning. I can\'t wait to see what we write next. 💕',
  'Every chapter with you is my favourite. Here\'s to filling many more pages.',
  'Here\'s to many more pages. With you, the best is always yet to come.',
  'With you, every day is a gift. Thank you for being mine.',
]

export const IMAGES_PER_PAGE = 3

export const LETTER_LINES = [
  "I don't know how to put all my feelings into words, but I know one thing for sure — my heart has always known you were meant to be mine.",
  "From the moment you came into my life, everything felt different… calmer, warmer, real. You didn't just become someone I love — you became my **safe place**, my **best friend**, my **soulmate**, the one person my heart runs to without thinking. 🤍✨",
  "Being loved by you is something I had craved for all my life, and now that I have it, I never want to imagine a world without you.",
  "I want you to know this, clearly and honestly — **I choose you**. Not just today, not just when things are easy, but **every single day**, in every phase of life. I promise to stand by you in your happiest moments and hold you even tighter in your hardest ones. I'll be there when you smile, when you cry, when you're strong, and even when you feel tired. 🫶",
  'You are not alone. You never will be.',
  'Your dreams are my dreams. Your pain is my pain. Your happiness is my biggest victory. I want to grow with you, learn with you, and build a life where love, trust, and respect never fade.',
  "I don't promise perfection — but I promise **loyalty, honesty, patience, and a love that lasts till my last breath**. ♾️❤️",
  "If soulmates exist, then my heart already knows its answer — **it's you**.",
  'Forever yours,',
  'Always by your side,',
  'With all my love ❤️✨',
]

const LETTER_PAGE_1 = {
  letter: true,
  title: 'My Dearest AmorZinho',
  lines: LETTER_LINES.slice(0, 6),
}
const LETTER_PAGE_2 = {
  letter: true,
  title: null,
  lines: [...LETTER_LINES.slice(6), `Your ${BOY_NAME}`],
}

export function buildBookSpreads() {
  const spreads = []
  let idx = 0
  const take = (n) => {
    const arr = []
    for (let i = 0; i < n && idx < OUR_PICS_URLS.length; i++) {
      arr.push(OUR_PICS_URLS[idx])
      idx += 1
    }
    return arr
  }
  while (idx < OUR_PICS_URLS.length) {
    const spreadId = spreads.length
    const noteBase = spreadId * 6
    const leftUrls = take(IMAGES_PER_PAGE)
    const notes = [
      PAGE_NOTES[(noteBase + 0) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 1) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 2) % PAGE_NOTES.length],
    ]
    const rightNotes = [
      PAGE_NOTES[(noteBase + 3) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 4) % PAGE_NOTES.length],
      PAGE_NOTES[(noteBase + 5) % PAGE_NOTES.length],
    ]
    const left = {
      imageUrls: leftUrls,
      notes,
      spreadId,
      page: 'L',
      ...(spreadId === 2 ? { skipMiddleRow: true } : {}),
    }
    const rightUrls = take(IMAGES_PER_PAGE)
    if (rightUrls.length > 0) {
      spreads.push({
        left,
        right: { imageUrls: rightUrls, notes: rightNotes, spreadId, page: 'R' },
      })
    } else {
      spreads.push({ left, right: LETTER_PAGE_1 })
      spreads.push({ left: LETTER_PAGE_2, right: { dedication: true } })
      return spreads
    }
  }
  spreads.push({
    left: { dedication: true },
    right: LETTER_PAGE_1,
  })
  spreads.push({
    left: LETTER_PAGE_2,
    right: { dedication: true },
  })
  return spreads
}

const BOOK_SPREADS = buildBookSpreads()
export const BOOK_PAGES = BOOK_SPREADS.flatMap((s) => [s.left, s.right])
export const BOOK_TOTAL_PAGES = BOOK_PAGES.length
