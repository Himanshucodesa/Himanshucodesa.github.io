// ─────────────────────────────────────────────────────────────
// Your photos. To add your own:
//   1. Drop the image into  public/photos/  (e.g. public/photos/sunset.jpg)
//   2. Add an entry below with  src: 'photos/sunset.jpg'
//   3. Set featured: true to show it on the home page.
// width/height are the image's aspect ratio (used to avoid layout jumps).
// The placeholder-*.svg entries are stand-ins — delete them (and the files) when ready.
// ─────────────────────────────────────────────────────────────

const placeholder = (name) => `photos/placeholder-${name}.svg`

export const categories = ['Landscape', 'Street', 'Portrait', 'Travel']

export const photos = [
  { id: 'p1', title: 'Morning ridge', category: 'Landscape', src: placeholder('ridge'), width: 1600, height: 1067, featured: true },
  { id: 'p2', title: 'Crossing', category: 'Street', src: placeholder('crossing'), width: 1067, height: 1600, featured: true },
  { id: 'p3', title: 'Quiet hour', category: 'Portrait', src: placeholder('quiet'), width: 1200, height: 1500, featured: true },
  { id: 'p4', title: 'Harbour', category: 'Travel', src: placeholder('harbour'), width: 1600, height: 1067, featured: true },
  { id: 'p5', title: 'Salt flats', category: 'Landscape', src: placeholder('salt'), width: 1600, height: 900 },
  { id: 'p6', title: 'Night market', category: 'Street', src: placeholder('market'), width: 1200, height: 1600, featured: true },
  { id: 'p7', title: 'Window light', category: 'Portrait', src: placeholder('window'), width: 1067, height: 1600 },
  { id: 'p8', title: 'Old town', category: 'Travel', src: placeholder('oldtown'), width: 1600, height: 1200, featured: true },
  { id: 'p9', title: 'Fog line', category: 'Landscape', src: placeholder('fog'), width: 1200, height: 1500 },
  { id: 'p10', title: 'Rain', category: 'Street', src: placeholder('rain'), width: 1600, height: 1067 },
  { id: 'p11', title: 'Profile', category: 'Portrait', src: placeholder('profile'), width: 1600, height: 1067 },
  { id: 'p12', title: 'Coastal road', category: 'Travel', src: placeholder('coast'), width: 1067, height: 1600 },
]

// The large image on the home page hero
export const heroPhoto = { src: placeholder('hero'), alt: 'Featured photograph' }
