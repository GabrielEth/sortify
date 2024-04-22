import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login";
import ProtectedRoute from "./routeguard.jsx";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Callback from "./callback.jsx";
import SettingsDrawer from "./settingsdrawer.tsx";
import CreatePlaylist from "./components/createplaylist.jsx";
import UpdatePlaylist from "./components/updateplaylist.jsx";
import ContactPage from "./Contact/ContactPage.jsx";

const theme = createTheme({
  // You can customize your theme settings here
});

const App = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    setShowSettings(path !== "/login");
  }, [location]);

  return (
    <>
      {showSettings && <SettingsDrawer />}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/createplaylist" element={<CreatePlaylist />} />
          </Route>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
