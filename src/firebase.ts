// Firebase configuration for NeuroQuest Academy
// Project: neuroquest-academy-2026

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDMlB7jx_2sH8cUEQVHrndSMYc3uVmDB9o",
  authDomain: "neuroquest-academy-2026.firebaseapp.com",
  projectId: "neuroquest-academy-2026",
  storageBucket: "neuroquest-academy-2026.firebasestorage.app",
  messagingSenderId: "268582168891",
  appId: "1:268582168891:web:9438a4b62b6d1cdcd8af1e",
  databaseURL: "https://neuroquest-academy-2026-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// Auth helpers
export const loginAnonymously = () => signInAnonymously(auth);

export const onUserStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Database helpers
export const saveProgress = async (uid: string, metrics: Record<string, unknown>) => {
  const progressRef = ref(db, `users/${uid}/progress`);
  const snapshot = await get(progressRef);
  const existing = snapshot.val() || {};
  await set(progressRef, {
    ...existing,
    ...metrics,
    lastUpdated: new Date().toISOString()
  });
};

export const loadProgress = async (uid: string) => {
  const progressRef = ref(db, `users/${uid}/progress`);
  const snapshot = await get(progressRef);
  return snapshot.val();
};

export default app;
