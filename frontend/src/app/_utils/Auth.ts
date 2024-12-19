// src/utils/auth.ts
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from "firebase/auth";
import { firebaseApp } from "./Firebase";

// Initialize Firebase Auth and Providers
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

/**
 * Login with Google
 */
export const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    return null;
  }
};

/**
 * Login with Email and Password
 * @param email - User's email
 * @param password - User's password
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error logging in with email and password:", error);
    return null;
  }
};

/**
 * Create a New Account with Email and Password
 * @param email - User's email
 * @param password - User's password
 */
export const signupWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing up with email and password:", error);
    return null;
  }
};

/**
 * Send a Password Reset Email
 * @param email - User's email
 */
export const resetPassword = async (email: string): Promise<boolean> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

/**
 * Logout the current user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
