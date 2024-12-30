import { useEffect, useState } from "react";

import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";

function App() {
  const { user, checkUser } = useAuth();

  useEffect(() => {
    checkUser();

    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  return <>{user ? <Repositories /> : <Home />}</>;
}

export default App;
