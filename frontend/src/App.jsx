import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import ProtectedRoute from "./routeguard";

const App = () => {
  return (
    <>
      <div className="header">
        <img src=""></img> {/* for settings cog */}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <div className="footer"></div>
    </>
  );
};

export default App;
