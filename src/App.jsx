import { useEffect } from "react";

import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import RepoDetails from "./pages/RepoDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  const { checkUser } = useAuth();

  useEffect(() => {
    checkUser();

    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  return (
    <>
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

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
