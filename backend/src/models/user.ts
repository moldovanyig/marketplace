declare module 'http' {
  interface IncomingHttpHeaders {
    id: number;
    name: string;
    money: number;
  }
}

export interface User {
  id: number;
  name: string;
  money: number;
}
