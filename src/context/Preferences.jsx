import { createContext, useContext, useEffect, useState } from 'react'

export const languages = { en: 'English', nl: 'Nederlands', de: 'Deutsch', fr: 'Français' }
const translations = {
  nl: {
    "For the moments that don’t ask for attention.": "Voor de momenten die niet om aandacht vragen.",
    "A passing glance. A street before it wakes. Light finding its way into an ordinary afternoon. Small things, given a little room.": "Een vluchtige blik. Een straat die nog moet ontwaken. Licht dat een gewone middag binnenvalt. Kleine dingen, met wat ruimte om te spreken.",
    "No fixed route. Start with a face, wander into a landscape, stay wherever the light takes you.": "Geen vaste route. Begin bij een gezicht, dwaal een landschap in en blijf waar het licht je brengt.",
    "Look a little longer.": "Kijk nog even.",
    "There is a moment just before someone notices the camera. The shoulders soften. The performance falls away. Something honest comes into view. That is the kind of moment Frame the Potraits is drawn to.": "Er is een moment vlak voordat iemand de camera opmerkt. De schouders ontspannen. De pose verdwijnt. Iets echts wordt zichtbaar. Dat is het soort moment waar Frame the Potraits naar zoekt.",
    "The same curiosity follows the lens outside: into streets, across coastlines, through the familiar and the faraway. A photograph cannot keep the whole day. But it can keep the part that made you feel something.": "Diezelfde nieuwsgierigheid neemt de lens mee naar buiten: de straat op, langs kustlijnen, naar het vertrouwde en het verre. Een foto kan niet de hele dag bewaren. Wel het stukje dat je raakte.",
    "What do you see?": "Wat zie jij?",
    "A portrait that feels like you. A place with a story. An idea still taking shape. The next frame can start with any of them.": "Een portret waarin je jezelf herkent. Een plek met een verhaal. Een idee dat nog vorm krijgt. Het volgende beeld kan met elk van die dingen beginnen.",
    "Some moments stay.": "Sommige momenten blijven.",
    "Follow your eye.": "Volg je blik.",
    "The shutter closes. The story stays.": "De sluiter sluit. Het verhaal blijft.",
    "Stay a little longer": "Blijf nog even",
    "Explore the collection": "Ontdek de collectie",
    "Get in touch": "Neem contact op",
    Work: 'Werk', Gallery: 'Galerij', About: 'Over mij', Contact: 'Contact',
    Archive: 'Archief', 'Selected work': 'Geselecteerd werk', Featured: 'Uitgelicht', 'View full gallery': 'Bekijk de volledige galerij',
    'Out of frame.': 'Buiten beeld.', "That page doesn't exist.": 'Deze pagina bestaat niet.', 'Back home': 'Terug naar de startpagina',
    All: 'Alles', Landscape: 'Landschap', Street: 'Straat', Portrait: 'Portret', Travel: 'Reizen',
    Scroll: 'Scrollen', Close: 'Sluiten', Previous: 'Vorige', Next: 'Volgende', 'Toggle menu': 'Menu openen of sluiten',
    Language: 'Taal', Theme: 'Thema', Dark: 'Donker', Light: 'Licht', home: 'startpagina', 'Featured photograph': 'Uitgelichte foto',
    'Behind the lens': 'Achter de lens', 'Morning ridge': 'Bergrug in de ochtend', Crossing: 'Oversteek', 'Quiet hour': 'Stil uur', Harbour: 'Haven', 'Salt flats': 'Zoutvlaktes', 'Night market': 'Nachtmarkt', 'Window light': 'Raamlicht', 'Old town': 'Oude stad', 'Fog line': 'Mistlijn', Rain: 'Regen', Profile: 'Profiel', 'Coastal road': 'Kustweg',
  },
  de: {
    "For the moments that don’t ask for attention.": "Für die Momente, die nicht um Aufmerksamkeit bitten.",
    "A passing glance. A street before it wakes. Light finding its way into an ordinary afternoon. Small things, given a little room.": "Ein flüchtiger Blick. Eine Straße, bevor sie erwacht. Licht, das in einen gewöhnlichen Nachmittag fällt. Kleine Dinge, denen wir Raum geben.",
    "No fixed route. Start with a face, wander into a landscape, stay wherever the light takes you.": "Keine feste Route. Beginne mit einem Gesicht, streife durch eine Landschaft und bleib, wohin das Licht dich führt.",
    "Look a little longer.": "Schau ein wenig länger hin.",
    "There is a moment just before someone notices the camera. The shoulders soften. The performance falls away. Something honest comes into view. That is the kind of moment Frame the Potraits is drawn to.": "Es gibt diesen Moment, kurz bevor jemand die Kamera bemerkt. Die Schultern entspannen sich. Die Pose fällt ab. Etwas Echtes wird sichtbar. Solche Momente ziehen Frame the Potraits an.",
    "The same curiosity follows the lens outside: into streets, across coastlines, through the familiar and the faraway. A photograph cannot keep the whole day. But it can keep the part that made you feel something.": "Dieselbe Neugier führt das Objektiv nach draußen: auf Straßen, entlang der Küsten, ins Vertraute und in die Ferne. Ein Foto kann nicht den ganzen Tag festhalten. Aber den Teil, der etwas in dir bewegt hat.",
    "What do you see?": "Was siehst du?",
    "A portrait that feels like you. A place with a story. An idea still taking shape. The next frame can start with any of them.": "Ein Porträt, in dem du dich wiedererkennst. Ein Ort mit einer Geschichte. Eine Idee, die noch Gestalt annimmt. Das nächste Bild kann mit allem davon beginnen.",
    "Some moments stay.": "Manche Momente bleiben.",
    "Follow your eye.": "Folge deinem Blick.",
    "The shutter closes. The story stays.": "Der Verschluss schließt sich. Die Geschichte bleibt.",
    "Stay a little longer": "Bleib noch ein wenig",
    "Explore the collection": "Sammlung entdecken",
    "Get in touch": "Kontakt aufnehmen",
    Work: 'Arbeiten', Gallery: 'Galerie', About: 'Über mich', Contact: 'Kontakt',
    Archive: 'Archiv', 'Selected work': 'Ausgewählte Arbeiten', Featured: 'Highlights', 'View full gallery': 'Gesamte Galerie ansehen',
    'Out of frame.': 'Außerhalb des Bildes.', "That page doesn't exist.": 'Diese Seite existiert nicht.', 'Back home': 'Zur Startseite',
    All: 'Alle', Landscape: 'Landschaft', Street: 'Straße', Portrait: 'Porträt', Travel: 'Reisen',
    Scroll: 'Scrollen', Close: 'Schließen', Previous: 'Zurück', Next: 'Weiter', 'Toggle menu': 'Menü öffnen oder schließen',
    Language: 'Sprache', Theme: 'Design', Dark: 'Dunkel', Light: 'Hell', home: 'Startseite', 'Featured photograph': 'Ausgewähltes Foto',
    'Behind the lens': 'Hinter der Linse', 'Morning ridge': 'Bergkamm am Morgen', Crossing: 'Überquerung', 'Quiet hour': 'Stille Stunde', Harbour: 'Hafen', 'Salt flats': 'Salzebenen', 'Night market': 'Nachtmarkt', 'Window light': 'Fensterlicht', 'Old town': 'Altstadt', 'Fog line': 'Nebelgrenze', Rain: 'Regen', Profile: 'Profil', 'Coastal road': 'Küstenstraße',
  },
  fr: {
    "For the moments that don’t ask for attention.": "Pour les instants qui ne réclament pas d’attention.",
    "A passing glance. A street before it wakes. Light finding its way into an ordinary afternoon. Small things, given a little room.": "Un regard furtif. Une rue avant son réveil. La lumière qui se glisse dans un après-midi ordinaire. De petites choses auxquelles on laisse un peu de place.",
    "No fixed route. Start with a face, wander into a landscape, stay wherever the light takes you.": "Pas d’itinéraire imposé. Commencez par un visage, perdez-vous dans un paysage, attardez-vous là où la lumière vous mène.",
    "Look a little longer.": "Prenez le temps de regarder.",
    "There is a moment just before someone notices the camera. The shoulders soften. The performance falls away. Something honest comes into view. That is the kind of moment Frame the Potraits is drawn to.": "Il y a cet instant, juste avant que quelqu’un remarque l’appareil. Les épaules se détendent. La pose s’efface. Quelque chose de sincère apparaît. C’est ce qui attire Frame the Potraits.",
    "The same curiosity follows the lens outside: into streets, across coastlines, through the familiar and the faraway. A photograph cannot keep the whole day. But it can keep the part that made you feel something.": "La même curiosité entraîne l’objectif dehors : dans les rues, le long des côtes, vers le familier et le lointain. Une photographie ne peut pas garder toute une journée. Mais elle peut en garder ce qui vous a touché.",
    "What do you see?": "Que voyez-vous ?",
    "A portrait that feels like you. A place with a story. An idea still taking shape. The next frame can start with any of them.": "Un portrait qui vous ressemble. Un lieu qui a une histoire. Une idée qui prend forme. La prochaine image peut commencer par chacun d’eux.",
    "Some moments stay.": "Certains instants restent.",
    "Follow your eye.": "Suivez votre regard.",
    "The shutter closes. The story stays.": "L’obturateur se ferme. L’histoire reste.",
    "Stay a little longer": "Attardez-vous encore",
    "Explore the collection": "Explorer la collection",
    "Get in touch": "Contactez-moi",
    Work: 'Projets', Gallery: 'Galerie', About: 'À propos', Contact: 'Contact',
    Archive: 'Archives', 'Selected work': 'Sélection de projets', Featured: 'À la une', 'View full gallery': 'Voir toute la galerie',
    'Out of frame.': 'Hors cadre.', "That page doesn't exist.": 'Cette page n’existe pas.', 'Back home': 'Retour à l’accueil',
    All: 'Tout', Landscape: 'Paysage', Street: 'Rue', Portrait: 'Portrait', Travel: 'Voyage',
    Scroll: 'Défiler', Close: 'Fermer', Previous: 'Précédent', Next: 'Suivant', 'Toggle menu': 'Ouvrir ou fermer le menu',
    Language: 'Langue', Theme: 'Thème', Dark: 'Sombre', Light: 'Clair', home: 'accueil', 'Featured photograph': 'Photographie à la une',
    'Behind the lens': 'Derrière l’objectif', 'Morning ridge': 'Crête matinale', Crossing: 'Traversée', 'Quiet hour': 'Heure paisible', Harbour: 'Port', 'Salt flats': 'Étendues de sel', 'Night market': 'Marché de nuit', 'Window light': 'Lumière de fenêtre', 'Old town': 'Vieille ville', 'Fog line': 'Ligne de brume', Rain: 'Pluie', Profile: 'Profil', 'Coastal road': 'Route côtière',
  },
}
const Preferences = createContext(null)
function saved(key, allowed, fallback) {
  try { const value = localStorage.getItem(key); return allowed.includes(value) ? value : fallback } catch { return fallback }
}
export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(() => saved('frame-theme', ['dark', 'light'], 'dark'))
  const [language, setLanguage] = useState(() => saved('frame-language', Object.keys(languages), 'en'))
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = language
    try { localStorage.setItem('frame-theme', theme); localStorage.setItem('frame-language', language) } catch { /* Preferences still work when storage is unavailable. */ }
  }, [theme, language])
  const t = (text) => translations[language]?.[text] ?? text
  return <Preferences.Provider value={{ theme, setTheme, language, setLanguage, t }}>{children}</Preferences.Provider>
}
export const usePreferences = () => useContext(Preferences)
