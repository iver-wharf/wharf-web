
export interface AuthProvider {
  getName(): string;
  isAuthenticated(): boolean;
};
