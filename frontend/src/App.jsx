import Login from "./Login";
import ProtectedRoute from "./routeguard.jsx";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./dashboard/dashboard";
import Callback from "./callback.jsx";
import SettingsCog from "./assets/settings.svg";
import SettingsModal from "./settingsmodal";

const App = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  return (
      <BrowserRouter>
        <div className="header">
          <img src=""></img> {/* for settings cog */}
        </div>
      <div className="header">
        <img
          src={SettingsCog}
          className="cog"
          onClick={toggleSettingsModal}
        ></img>
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={toggleSettingsModal}
        />
      </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
        <div className="footer"></div>
      </BrowserRouter>
  );
};

export default App;
