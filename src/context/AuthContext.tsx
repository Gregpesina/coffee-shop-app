import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextValue {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  addPointsLocally: (points: number) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // After placing an order we update Firestore (see orderService), but the
  // screen showing the point count needs to update immediately too --
  // this keeps local state in sync without waiting for a re-fetch.
  function addPointsLocally(points: number) {
    setUser((current) => (current ? { ...current, rewardPoints: current.rewardPoints + points } : current));
  }

  return (
    <AuthContext.Provider value={{ user, setUser, addPointsLocally }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
