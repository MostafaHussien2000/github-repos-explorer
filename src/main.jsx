import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Theme appearance="dark" accentColor="green" grayColor="slate">
        <Container>
          <App />
        </Container>
      </Theme>
    </AuthProvider>
  </StrictMode>
);
