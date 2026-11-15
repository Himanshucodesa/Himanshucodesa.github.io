import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served at the root of the custom domain www.frametheportraits.com
export default defineConfig({
  plugins: [react()],
  base: '/',
})
