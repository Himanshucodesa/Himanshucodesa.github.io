// ─────────────────────────────────────────────────────────────
// Site-wide settings. Edit this file to change text, links, and
// navigation — no component code needs to change.
// ─────────────────────────────────────────────────────────────
const brandWords = ['Frame', 'the', 'Potraits']
const brand = brandWords.join(' ')

export const site = {
  name: brand,
  brand,
  brandWords,
  acronym: brandWords.map((word) => word[0]).join('').toLowerCase(),
  url: 'https://www.framethepotraits.com/',
  description: `${brand} — A photographic exploration of people, places, and everyday moments, told through portraits, street scenes, landscapes, and travel.`,
  tagline: 'For the moments that don’t ask for attention.',
  // Add confirmed contact details here; empty values stay out of the UI.
  email: null,

  nav: [
    { label: 'Work', to: '/' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  socials: [],

  home: {
    heading: 'Some moments stay.',
    galleryLink: 'Stay a little longer',
    introduction: 'A passing glance. A street before it wakes. Light finding its way into an ordinary afternoon. Small things, given a little room.',
  },

  gallery: {
    heading: 'Follow your eye.',
    introduction: 'No fixed route. Start with a face, wander into a landscape, stay wherever the light takes you.',
  },

  contact: {
    heading: 'What do you see?',
    introduction: 'A portrait that feels like you. A place with a story. An idea still taking shape. The next frame can start with any of them.',
  },

  about: {
    note: 'The shutter closes. The story stays.',
    heading: 'Look a little longer.',
    paragraphs: [
      'There is a moment just before someone notices the camera. The shoulders soften. The performance falls away. Something honest comes into view. That is the kind of moment Frame the Potraits is drawn to.',
      'The same curiosity follows the lens outside: into streets, across coastlines, through the familiar and the faraway. A photograph cannot keep the whole day. But it can keep the part that made you feel something.',
    ],
    // Path inside /public, or a full URL
    portrait: 'photos/portrait-with-camera.jpg',
  },
}
