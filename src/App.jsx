import { useEffect } from "react";

import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import RepoDetails from "./pages/RepoDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { checkUser } = useAuth();

  useEffect(() => {
    checkUser();

    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  return (
    <Routes>
      <Route exact path="/" Component={Home} />

      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/repos/:slug"
        element={
          <ProtectedRoute>
            <RepoDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
