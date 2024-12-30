import { createContext, useState, useEffect, useContext } from "react";

import supabase from "../supabase/client";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await supabase.auth.getUser();
      setUser(userData?.data?.user?.user_metadata);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setLoading(true);
      setError(null);
      await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setLoading(true);
      setError(null);
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    checkUser,
    signInWithGithub,
    signout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
