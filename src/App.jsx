import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import supabase from "./supabase/client";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser();

    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  const checkUser = async () => {
    const userData = await supabase.auth.getUser();
    console.log(userData);
    setUser(userData?.data?.user?.user_metadata);
  };

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const signout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <h1>Hello {user ? user.preferred_username : null},</h1>
      {user ? (
        <button onClick={signout}>Sign out</button>
      ) : (
        <button onClick={signInWithGithub}>Sign in</button>
      )}
    </>
  );
}

export default App;
