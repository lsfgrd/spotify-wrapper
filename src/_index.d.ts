/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module NodeJS  {
  interface Global {
    fetch: any;
  }
}