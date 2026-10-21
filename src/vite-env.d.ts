/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERIFY_URL?: string
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

