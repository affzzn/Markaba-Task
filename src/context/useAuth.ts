import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./types";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth needs AuthProvider");
  }
  return context;
};
