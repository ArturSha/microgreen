/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_PASSWORD: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_BASE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
