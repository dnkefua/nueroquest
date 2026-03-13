// Real Firebase Auth + DB hook — replaces firebaseSim.ts
import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, saveProgress, loadProgress } from '../firebase';

export interface AuthUser {
  uid: string;
  isAnonymous: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, isAnonymous: firebaseUser.isAnonymous });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginAnonymously = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.error('Anonymous sign-in failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, loading, loginAnonymously, logout };
};

// Re-export saveProgress so App.tsx can use it via the same path pattern
export { saveProgress, loadProgress };
