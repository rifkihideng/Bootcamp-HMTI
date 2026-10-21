import { defineConfig, type Plugin } from 'vite'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import JavaScriptObfuscator from 'javascript-obfuscator'

function obfuscateDistAssets(): Plugin {
  return {
    name: 'obfuscate-dist-assets',
    apply: 'build',
    closeBundle() {
      const assetsDir = join(process.cwd(), 'dist', 'assets')
      let files: string[] = []
      try {
        files = readdirSync(assetsDir).filter((file) => file.endsWith('.js'))
      } catch {
        return
      }

      for (const file of files) {
        const filePath = join(assetsDir, file)
        const source = readFileSync(filePath, 'utf8')

        // Lewati bundle vendor yang besar (React/GSAP) agar parsing awal tetap cepat.
        if (source.length > 60_000) continue

        const result = JavaScriptObfuscator.obfuscate(source, {
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false,
          selfDefending: false,
          stringArray: false,
          identifierNamesGenerator: 'hexadecimal',
          renameGlobals: false,
        })
        writeFileSync(filePath, result.getObfuscatedCode())
        console.log(`Obfuscated ${file}`)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), obfuscateDistAssets()],
})
