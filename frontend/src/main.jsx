import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { WorkoutsContextProvider } from "./context/WorkoutsContext.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          closeButton
          richColors
          toastOptions={{
            style: {
              background: "#1E1E1E",
              color: "#F5F5F5",
              border: "1px solid #2A2A2A",
              borderRadius: "16px",
              boxShadow: "0 10px 35px rgba(0,0,0,.30)",
            },
          }}
        />
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
