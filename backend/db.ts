export interface User {
  id: string;
  email: string;
  password: string;
}

export class DB {
  private users = new Map<string, User>();
  private refreshTokens = new Set<string>();

  createUser(email: string, hashedPassword: string): User {
    const user = { id: crypto.randomUUID(), email, password: hashedPassword };
    this.users.set(email, user);
    return user;
  }

  getUser(email: string): User | undefined {
    return this.users.get(email);
  }

  getUserById(id: string): User | undefined {
    return Array.from(this.users.values()).find((user) => user.id === id);
  }

  storeRefreshToken(token: string) {
    this.refreshTokens.add(token);
  }

  removeRefreshToken(token: string) {
    this.refreshTokens.delete(token);
  }

  isValidRefreshToken(token: string): boolean {
    return this.refreshTokens.has(token);
  }
}
