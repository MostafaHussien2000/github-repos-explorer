import { useEffect, useState } from "react";

import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  const { user, checkUser, signInWithGithub, signout } = useAuth();

  useEffect(() => {
    checkUser();

    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  return (
    <>
      {/* <h1>Hello {user ? user.preferred_username : null},</h1>
      {user ? (
        <button onClick={signout}>Sign out</button>
      ) : (
        <button onClick={signInWithGithub}>Sign in</button>
      )} */}

      <Home />
    </>
  );
}

export default App;
