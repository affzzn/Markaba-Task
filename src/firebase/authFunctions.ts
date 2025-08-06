import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
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

export const logout = async () => {
  await signOut(auth);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
