import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  type AuthProvider,
} from "firebase/auth";

import { auth } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// common funct
const signInWithProvider = async (provider: AuthProvider) => {
  const result = await signInWithPopup(auth, provider);
  const firebaseUser = result.user;

  const token = await firebaseUser.getIdToken();

  const user = {
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  };

  return { user, token };
};

// google login
export const googleSignIn = async () => {
  try {
    return await signInWithProvider(googleProvider);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

//logout
export const logout = async (): Promise<void> => {
  await signOut(auth);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// github login

export const githubSignIn = async () => {
  try {
    return await signInWithProvider(githubProvider);
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/account-exists-with-different-credential"
    ) {
      const pendingCred = GithubAuthProvider.credentialFromError(error);
      const email = error.customData?.email as string | undefined;

      if (email && pendingCred) {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.includes("google.com")) {
          throw new Error("This email is already used with Google.");
        } else {
          throw new Error("This email is already used with another provider.");
        }
      }
    }

    console.error("GitHub Sign-In Error:", error);
    throw error;
  }
};
