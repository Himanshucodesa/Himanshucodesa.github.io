// ─────────────────────────────────────────────────────────────
// Site-wide settings. Edit this file to change text, links, and
// navigation — no component code needs to change.
// ─────────────────────────────────────────────────────────────
const brandWords = ['Frame', 'the', 'Portraits']
const brand = brandWords.join(' ')

export const site = {
  name: brand,
  brand,
  brandWords,
  acronym: brandWords.map((word) => word[0]).join('').toLowerCase(),
  url: 'https://www.frametheportraits.com/',
  description: `${brand} — Portrait and event photography: adult portraits, baby portraits, and dance events.`,
  tagline: 'Portraits with feeling. Events with life.',
  // Add confirmed contact details here; empty values stay out of the UI.
  email: null,

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Portfolio', to: '/gallery' },
    { label: 'My story', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  socials: [],

  home: {
    heading: 'People. Presence. A moment kept.',
    galleryLink: 'Stay a little longer',
    introduction: 'A portrait that feels like you. The smallest expressions of a baby. A dancer caught between two steps. These are the stories I photograph.',
  },

  gallery: {
    emptyMessage: 'A new selection of portraits and event stories is on its way.',
    heading: 'Faces, first moments, and the stage.',
    introduction: 'Explore adult portraits, baby portraits, and dance events. Different stories, the same attention to the person in the frame.',
  },

  contact: {
    heading: 'Your next story, in focus.',
    introduction: 'Planning a portrait session, photographs of your baby, or a dance event? Tell me what you have in mind and the moments you want to remember.',
  },

  about: {
    note: 'The shutter closes. The story stays.',
    heading: 'It started with a bird.',
    paragraphs: [
      'My photography began with birds. Watching, waiting, learning to notice the smallest movement. That was where I first learned patience, and how much a change in light can change a photograph.',
      'From birds, I moved to the streets. The subjects changed, but the curiosity stayed: a passing expression, an unexpected gesture, a story unfolding in a fraction of a second.',
      'Today, I bring that same attention to people. I photograph adult portraits, babies, and dance events, from a quiet expression to the energy of a performance. The thread through it all is the same: notice what matters, and be ready when it happens.',
    ],
    // Path inside /public, or a full URL
    portrait: 'photos/portrait-with-camera.jpg',
  },
}
