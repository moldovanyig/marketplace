declare module 'http' {
  interface IncomingHttpHeaders {
    id: number;
  }
}

export interface User {
  id: number;
}
