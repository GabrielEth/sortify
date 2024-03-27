import Login from "./Login";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* </Route> */}
          <Route path="/" element={<Navigate replace to="/login" />} />
          {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
      <div className="footer"></div>
    </>
  );
};

export default App;
