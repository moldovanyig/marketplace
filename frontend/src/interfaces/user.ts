export interface UserInfo {
  name: string;
  password: string;
  avatar?: string;
}

export interface UserRequest {
  name: string;
}

export interface UserResponse {
  error?: string;
  avatar?: number;
  money?: number;
}
