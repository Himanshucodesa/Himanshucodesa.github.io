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
  url: 'https://www.framethepotraits.com/',
  description: `${brand} — Light, place, and the moments in between. A photography portfolio.`,
  tagline: 'Light, place, and the moments in between.',
  location: 'Based in Mumbai · Available worldwide',
  email: 'hello@example.com',

  nav: [
    { label: 'Work', to: '/' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Behance', href: 'https://behance.net/' },
  ],

  about: {
    heading: 'Hello, I make photographs.',
    paragraphs: [
      'Write a short introduction here — who you are, what you shoot, and what draws you to it.',
      'Add a second paragraph about your approach, gear, clients, or anything you want visitors to know.',
    ],
    // Path inside /public, or a full URL
    portrait: 'photos/portrait-with-camera.jpg',
  },
}
