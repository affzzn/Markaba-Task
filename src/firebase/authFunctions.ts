import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();

// google login
export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("signed in:", user);

    const token = await user.getIdToken();

    console.log("token:", token);
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );

    return { user, token };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

//logout
export const logout = async () => {
  await signOut(auth);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// github login

const githubProvider = new GithubAuthProvider();

export const githubSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    const token = await user.getIdToken();

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );

    return { user, token };
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
