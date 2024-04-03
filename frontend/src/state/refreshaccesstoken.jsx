// import { useDispatch } from "react-redux";
// import { setTokens } from "./authslice";

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    // const dispatch = useDispatch();
  
    try {
      const response = await fetch(`http://localhost:5555/refresh_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          refreshToken,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      localStorage.setItem('access_token', data.access_token);
      // dispatch(setTokens({ data.access_token, refreshToken })); update redux with new tokens
  
      // Re-initiate any failed request or perform necessary updates in the UI
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle error (e.g., redirect to login)
    }
  }

  export default refreshAccessToken;
  