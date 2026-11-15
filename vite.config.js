import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { site } from './src/content/site.js'

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))

// Brand metadata and the custom domain come from the shared site settings.
export default defineConfig({
  plugins: [react(), {
    name: 'site-branding',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_BRAND%', escapeHtml(site.brand))
        .replaceAll('%SITE_DESCRIPTION%', escapeHtml(site.description))
        .replaceAll('%SITE_URL%', escapeHtml(site.url))
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'CNAME', source: new URL(site.url).hostname + '\n' })
    },
  }],
  resolve: {
    alias: { '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)) },
  },
  base: '/',
})
