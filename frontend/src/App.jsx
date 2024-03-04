import Login from "./login";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import SettingsCog from "./assets/settings.svg";
import SettingsModal from "./settingsmodal";

const App = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  return (
    <>
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
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <div className="footer"></div>
    </>
  );
};

export default App;
