/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // هر متغیر محیطی دیگری که دارید را اینجا اضافه کنید
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
