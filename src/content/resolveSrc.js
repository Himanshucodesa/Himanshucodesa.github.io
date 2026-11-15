// Turns 'photos/x.jpg' into a URL that works under the GitHub Pages base path.
// Full URLs (http/https) are returned unchanged.
export function resolveSrc(src) {
  if (/^https?:\/\//.test(src)) return src
  return import.meta.env.BASE_URL + src.replace(/^\//, '')
}
