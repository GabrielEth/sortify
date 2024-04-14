import { useEffect, useState } from "react";
import Login from "./Login";
import ProtectedRoute from "./routeguard.jsx";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Callback from "./callback.jsx";
import SettingsDrawer from "./settingsdrawer.tsx";
import CreatePlaylist from "./components/createplaylist.jsx";
import UpdatePlaylist from "./components/updateplaylist.jsx";

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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/createplaylist" element={<CreatePlaylist />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/updateplaylist" element={<UpdatePlaylist />} />
        </Route>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </>
  );
};

export default App;
