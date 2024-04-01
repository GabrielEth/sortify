import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokens } from "./state/authslice.jsx";

const Callback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    console.log({ accessToken, refreshToken });

    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
      navigate("/dashboard", { replace: true });
    }
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
