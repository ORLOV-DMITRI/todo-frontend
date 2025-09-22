import api from '@/lib/settings/axios';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  name: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  googleId?: string;
  githubId?: string;
  avatar?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/register', credentials);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  }
};