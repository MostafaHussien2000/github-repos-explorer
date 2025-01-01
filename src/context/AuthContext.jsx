import { createContext, useState, useEffect, useContext } from "react";

import supabase from "../supabase/client";
import { User } from "../utils/User";

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

      if (!userData?.data.user) throw new Error("No data found for this user.");

      const userInfo = new User(
        userData?.data?.user?.user_metadata?.preferred_username
      );

      await userInfo.fetchAllRelatedData();

      setUser({
        ...userData?.data?.user?.user_metadata,
        states: {
          following: userInfo.getFollowingCount(),
          followers: userInfo.getFollowersCount(),
          repos_count: userInfo.getReposCount(),
        },
      });
    } catch (err) {
      console.error("Authentication Error:", err);
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
      window.location.pathname = "/";
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
