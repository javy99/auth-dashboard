export const API_BASE = "http://localhost:8000";

export interface User {
  id: string;
  email: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: User;
}
