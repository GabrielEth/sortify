import Login from "./Login";
import ProtectedRoute from "./routeguard.jsx";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Callback from "./callback.jsx";
import CreatePlaylist from "./components/createplaylist.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="header">
        <img src=""></img> {/* for settings cog */}
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<CreatePlaylist />} />
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
