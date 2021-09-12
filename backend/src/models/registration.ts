export interface RegistrationResponse {
  id: number;
  name: string;
  avatar: number;
}

export interface RegistrationRequest {
  name: string;
  password: string;
  avatar: number;
}
