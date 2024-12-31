import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Theme appearance="dark" accentColor="green" grayColor="slate">
          <Container px={"4"}>
            <App />
          </Container>
        </Theme>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
