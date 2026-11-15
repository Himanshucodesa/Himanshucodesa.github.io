import { createContext, useContext, useEffect, useState } from 'react'

export const languages = { en: 'English', nl: 'Nederlands', de: 'Deutsch', fr: 'Français' }
const translations = {
  nl: {
    Work: 'Werk', Gallery: 'Galerij', About: 'Over mij', Contact: 'Contact',
    'Light, place, and the moments in between.': 'Licht, plaats en de momenten ertussen.',
    'Based in Mumbai · Available worldwide': 'Gevestigd in Mumbai · Wereldwijd beschikbaar',
    'Hello, I make photographs.': 'Hallo, ik maak foto’s.',
    'Write a short introduction here — who you are, what you shoot, and what draws you to it.': 'Schrijf hier een korte introductie — wie je bent, wat je fotografeert en wat je daarin aantrekt.',
    'Add a second paragraph about your approach, gear, clients, or anything you want visitors to know.': 'Voeg een tweede alinea toe over je aanpak, apparatuur, klanten of iets anders dat je bezoekers wilt vertellen.',
    'Get in touch': 'Neem contact op', "Let's work together": 'Laten we samenwerken',
    'Commissions, prints, collaborations — drop a line.': 'Opdrachten, afdrukken, samenwerkingen — stuur een bericht.',
    Archive: 'Archief', 'Selected work': 'Geselecteerd werk', Featured: 'Uitgelicht', 'View full gallery': 'Bekijk de volledige galerij',
    'Out of frame.': 'Buiten beeld.', "That page doesn't exist.": 'Deze pagina bestaat niet.', 'Back home': 'Terug naar de startpagina',
    All: 'Alles', Landscape: 'Landschap', Street: 'Straat', Portrait: 'Portret', Travel: 'Reizen',
    Scroll: 'Scrollen', Close: 'Sluiten', Previous: 'Vorige', Next: 'Volgende', 'Toggle menu': 'Menu openen of sluiten',
    Language: 'Taal', Theme: 'Thema', Dark: 'Donker', Light: 'Licht', home: 'startpagina', 'Featured photograph': 'Uitgelichte foto',
    'Behind the lens': 'Achter de lens', 'Morning ridge': 'Bergrug in de ochtend', Crossing: 'Oversteek', 'Quiet hour': 'Stil uur', Harbour: 'Haven', 'Salt flats': 'Zoutvlaktes', 'Night market': 'Nachtmarkt', 'Window light': 'Raamlicht', 'Old town': 'Oude stad', 'Fog line': 'Mistlijn', Rain: 'Regen', Profile: 'Profiel', 'Coastal road': 'Kustweg',
  },
  de: {
    Work: 'Arbeiten', Gallery: 'Galerie', About: 'Über mich', Contact: 'Kontakt',
    'Light, place, and the moments in between.': 'Licht, Orte und die Momente dazwischen.',
    'Based in Mumbai · Available worldwide': 'In Mumbai ansässig · Weltweit verfügbar',
    'Hello, I make photographs.': 'Hallo, ich fotografiere.',
    'Write a short introduction here — who you are, what you shoot, and what draws you to it.': 'Schreibe hier eine kurze Einführung — wer du bist, was du fotografierst und was dich daran fasziniert.',
    'Add a second paragraph about your approach, gear, clients, or anything you want visitors to know.': 'Ergänze einen zweiten Absatz über deine Arbeitsweise, Ausrüstung, Kunden oder andere Informationen für deine Besucher.',
    'Get in touch': 'Kontakt aufnehmen', "Let's work together": 'Lass uns zusammenarbeiten',
    'Commissions, prints, collaborations — drop a line.': 'Aufträge, Abzüge, Kooperationen — schreib mir.',
    Archive: 'Archiv', 'Selected work': 'Ausgewählte Arbeiten', Featured: 'Highlights', 'View full gallery': 'Gesamte Galerie ansehen',
    'Out of frame.': 'Außerhalb des Bildes.', "That page doesn't exist.": 'Diese Seite existiert nicht.', 'Back home': 'Zur Startseite',
    All: 'Alle', Landscape: 'Landschaft', Street: 'Straße', Portrait: 'Porträt', Travel: 'Reisen',
    Scroll: 'Scrollen', Close: 'Schließen', Previous: 'Zurück', Next: 'Weiter', 'Toggle menu': 'Menü öffnen oder schließen',
    Language: 'Sprache', Theme: 'Design', Dark: 'Dunkel', Light: 'Hell', home: 'Startseite', 'Featured photograph': 'Ausgewähltes Foto',
    'Behind the lens': 'Hinter der Linse', 'Morning ridge': 'Bergkamm am Morgen', Crossing: 'Überquerung', 'Quiet hour': 'Stille Stunde', Harbour: 'Hafen', 'Salt flats': 'Salzebenen', 'Night market': 'Nachtmarkt', 'Window light': 'Fensterlicht', 'Old town': 'Altstadt', 'Fog line': 'Nebelgrenze', Rain: 'Regen', Profile: 'Profil', 'Coastal road': 'Küstenstraße',
  },
  fr: {
    Work: 'Projets', Gallery: 'Galerie', About: 'À propos', Contact: 'Contact',
    'Light, place, and the moments in between.': 'La lumière, les lieux et les instants entre les deux.',
    'Based in Mumbai · Available worldwide': 'Basé à Mumbai · Disponible dans le monde entier',
    'Hello, I make photographs.': 'Bonjour, je fais des photographies.',
    'Write a short introduction here — who you are, what you shoot, and what draws you to it.': 'Rédigez une courte présentation — qui vous êtes, ce que vous photographiez et ce qui vous attire dans ces sujets.',
    'Add a second paragraph about your approach, gear, clients, or anything you want visitors to know.': 'Ajoutez un deuxième paragraphe sur votre approche, votre matériel, vos clients ou toute autre information destinée aux visiteurs.',
    'Get in touch': 'Contactez-moi', "Let's work together": 'Travaillons ensemble',
    'Commissions, prints, collaborations — drop a line.': 'Commandes, tirages, collaborations — écrivez-moi.',
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
