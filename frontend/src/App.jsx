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
