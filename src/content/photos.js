// Add approved web-sized photos to public/photos/adults, babies, or events.
// Register each image below using one of the exact category labels.
// Example entry (not displayed):
// { id: 'adult-01', title: 'A quiet moment', category: 'Adult portraits',
//   src: 'photos/adults/adult-01.jpg', width: 1200, height: 1800,
//   featured: true, objectPosition: '50% 35%' }
// featured selects homepage carousel highlights and chapter covers.
// Keep 12–18 highlights; all registered photos appear in the Portfolio.
// The orbit uses a 4:5 crop; the gallery/lightbox preserve original proportions.

export const categories = ['Adult portraits', 'Baby portraits', 'Dance events']

// Awaiting your next curated selection. No sample work is presented as yours.
export const photos = []

// Neutral backdrop until an approved cover photo is available.
const neutralCover = { src: 'photos/placeholder-hero.svg', alt: 'An abstract gradient of warm and cool tones' }
export const heroPhoto = photos.find((photo) => photo.featured) ?? photos[0] ?? neutralCover

// Keep the three service chapters available even before photos are added.
export const photoChapters = [
  { category: 'Adult portraits', group: 'Portraits', heading: 'A portrait that feels like you.', introduction: 'A familiar face, seen in a new light. Portraits with room for your personality.' },
  { category: 'Baby portraits', group: 'Portraits', presentation: 'orbit', heading: 'Little details. A whole new world.', introduction: 'Tiny expressions, curious eyes, and the moments that change before you notice.' },
  { category: 'Dance events', group: 'Events', heading: 'Feel the rhythm. Keep the moment.', introduction: 'The movement on stage, the expressions between steps, and the energy that fills the room.' },
].map((chapter) => {
  const collection = photos.filter((photo) => photo.category === chapter.category)
  return { ...chapter, photos: collection, cover: collection.find((photo) => photo.featured) ?? collection[0] ?? neutralCover }
})

export const featuredPhotos = photos.some((photo) => photo.featured)
  ? photos.filter((photo) => photo.featured)
  : photos
