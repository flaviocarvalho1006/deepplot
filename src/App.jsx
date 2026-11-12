import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { App as CapApp } from "@capacitor/app";
import AppRoutes from "./routes";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const backListener = CapApp.addListener("backButton", () => {
      if (location.pathname === "/") {
        CapApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      backListener.then((listener) => listener.remove());
    };
  }, [location.pathname, navigate]);

  return <AppRoutes />;
}

export default App;