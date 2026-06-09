/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import { UserProfile, StudentScoreHistory } from './types';

// Load our Firebase configuration from the JSON file
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Standard test connection to warn of offline state
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test_connection', 'connection_status'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client is currently offline. Checks may fail until connected.");
    }
  }
}
testConnection();

// Structured Firestore error logger as mandated
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Helper to log in with Google
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Auth popup failed:", error);
    throw error;
  }
}

// Helper to log out
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out failed:", error);
    throw error;
  }
}

// Helper: Ensure we have a profile document in Firestore
export async function fetchOrCreateUserProfile(user: User, fallbackProfile: UserProfile): Promise<UserProfile> {
  const docRef = doc(db, 'users', user.uid);
  const pathLog = `users/${user.uid}`;
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      // User is registering for the first time
      const newProfile: UserProfile = {
        ...fallbackProfile,
        id: user.uid,
        name: user.displayName || fallbackProfile.name,
        email: user.email || fallbackProfile.email,
        lastActive: new Date().toISOString(),
      };
      await setDoc(docRef, newProfile);
      return newProfile;
    }
  } catch (err) {
    return handleFirestoreError(err, OperationType.WRITE, pathLog);
  }
}

// Helper: Update User Profile
export async function updateUserProfile(userId: string, update: Partial<UserProfile>) {
  const docRef = doc(db, 'users', userId);
  const pathLog = `users/${userId}`;
  try {
    await updateDoc(docRef, update);
  } catch (err) {
    return handleFirestoreError(err, OperationType.UPDATE, pathLog);
  }
}

// Helper: Fetch Score History
export async function fetchUserScoreHistory(userId: string): Promise<StudentScoreHistory[]> {
  const scoresCollection = collection(db, 'users', userId, 'scores');
  const pathLog = `users/${userId}/scores`;
  try {
    const q = query(scoresCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const scores: StudentScoreHistory[] = [];
    querySnapshot.forEach((docSnap) => {
      scores.push(docSnap.data() as StudentScoreHistory);
    });
    return scores;
  } catch (err) {
    return handleFirestoreError(err, OperationType.LIST, pathLog);
  }
}

// Helper: Save Score Record
export async function saveScoreRecord(userId: string, scoreRecord: StudentScoreHistory) {
  const scoreRef = doc(db, 'users', userId, 'scores', scoreRecord.id);
  const pathLog = `users/${userId}/scores/${scoreRecord.id}`;
  try {
    await setDoc(scoreRef, scoreRecord);
  } catch (err) {
    return handleFirestoreError(err, OperationType.CREATE, pathLog);
  }
}
