export interface LoginRequest {
  name: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token?: string;
  message?: string;
}
