export interface User {
  name: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}