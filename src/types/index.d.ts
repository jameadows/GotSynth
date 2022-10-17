export {};

declare global {
  interface Window {
    Module: any; // 👈️ turn off type checking
    FS:any;
  }
}
