/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MONGODB_URL: string;
  readonly ACCESS_KEY: string;
  readonly SECRET_ACCESS_KEY: string;
  readonly APP_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
