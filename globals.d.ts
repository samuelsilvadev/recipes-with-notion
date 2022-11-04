declare namespace NodeJS {
  interface ProcessEnv {
    readonly NOTION_TOKEN: string;
    readonly PAGE_ID: string;
  }
}
