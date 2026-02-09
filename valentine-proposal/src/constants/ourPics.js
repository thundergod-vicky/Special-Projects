// Our Pics: PNG and JPG from src/Our Pics /, ordered by name (1, 2, 3, … then rest)
const ourPicsGlob = import.meta.glob('../Our Pics /*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })

function orderedOurPicsUrls() {
  const entries = Object.entries(ourPicsGlob)
  const byNum = (key) => {
    const name = key.replace(/^.*\//, '').replace(/\.[^.]+$/i, '')
    const n = parseInt(name, 10)
    return Number.isNaN(n) ? Infinity : n
  }
  entries.sort((a, b) => {
    const na = byNum(a[0])
    const nb = byNum(b[0])
    if (na !== nb) return na - nb
    return a[0].localeCompare(b[0])
  })
  const seen = new Set()
  return entries
    .map(([key, url]) => {
      const basename = key.replace(/^.*\//, '').toLowerCase()
      if (seen.has(basename)) return null
      seen.add(basename)
      return url
    })
    .filter(Boolean)
}

export const OUR_PICS_URLS = orderedOurPicsUrls()
export const BOOK_COVER_IMAGE = OUR_PICS_URLS.find((u) => /\/9\.(png|jpg|jpeg)$/i.test(u)) ?? OUR_PICS_URLS[0]

// Sweet Memories (Chocolate Day end screen): 4 images from src/chco day/
const sweetMemoriesGlob = import.meta.glob('../chco day/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, query: '?url', import: 'default' })
export const SWEET_MEMORIES_IMAGES = Object.entries(sweetMemoriesGlob)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([, url]) => url)
