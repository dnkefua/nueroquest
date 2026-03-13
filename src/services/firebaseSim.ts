import { useState, useEffect } from 'react';

interface SimulatedUser {
  uid: string;
  isAnonymous: boolean;
}

// A simple mock of Firebase Auth & DB to satisfy the requirements quickly without full backend setup.
export const useAuthSim = () => {
  const [user, setUser] = useState<SimulatedUser | null>(null);

  useEffect(() => {
    // Check local storage for an existing simulated session
    const savedUid = localStorage.getItem('nq_sim_uid');
    if (savedUid) {
      setUser({ uid: savedUid, isAnonymous: true });
    }
  }, []);

  const loginAnonymously = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUid = `anon_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('nq_sim_uid', newUid);
        setUser({ uid: newUid, isAnonymous: true });
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('nq_sim_uid');
    setUser(null);
  };

  return { user, loginAnonymously, logout };
};

export const saveProgressSim = async (uid: string, metrics: any) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      // Simulate pushing to Realtime Database
      const existingStr = localStorage.getItem(`nq_progress_${uid}`);
      const existing = existingStr ? JSON.parse(existingStr) : {};
      
      const newProgress = {
        ...existing,
        ...metrics,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(`nq_progress_${uid}`, JSON.stringify(newProgress));
      console.log('Simulated DB Save:', newProgress);
      resolve();
    }, 500);
  });
};
