export const Logger = {
  info(...props: any[]) {
    console.log(...props);
  },
  error(...props: any[]) {
    console.error(...props);
  },
  warn(...props: any[]) {
    console.warn(...props);
  },
  debug(...props: any[]) {
    console.debug(...props);
  },
};
