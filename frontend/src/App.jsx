import Login from "./login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import SettingsCog from "./assets/settings.svg";

const App = () => {
  return (
    <>
      <div className="header">
        <img src={SettingsCog} className="cog"></img>
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
