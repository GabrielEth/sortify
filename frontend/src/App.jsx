import Login from "./login";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page";

const App = () => {
  return (
    <>
      <div className="bg-green-400 text-white">Sortify</div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landingpage" element={ <LandingPage /> } />
      </Routes>
    </>
  );
};

export default App;
