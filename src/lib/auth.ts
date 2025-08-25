export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  subscription?: {
    tier: 'core' | 'full' | 'addon';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt?: Date;
  };
  purchases: Purchase[];
}

export interface Purchase {
  id: string;
  packageId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  documents: string[];
}

// Mock authentication - in production, this would integrate with a real auth service
class AuthService {
  private currentUser: User | null = null;

  async signUp(email: string, name: string, _password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
      purchases: []
    };
    
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  }

  async signIn(email: string, _password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, create a user if they don't exist
    const existingUser = localStorage.getItem('currentUser');
    if (existingUser) {
      this.currentUser = JSON.parse(existingUser);
      return this.currentUser!;
    }
    
    // Create demo user
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      createdAt: new Date(),
      purchases: []
    };
    
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasActiveSubscription(): boolean {
    return this.currentUser?.subscription?.status === 'active';
  }

  canAccessDocuments(): boolean {
    return this.isAuthenticated() && this.hasActiveSubscription();
  }
}

export const authService = new AuthService();
