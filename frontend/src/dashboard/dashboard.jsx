import { useState, useEffect } from "react";
import "./dashboard.css";
import PlaylistComponent from "./playlist-component.jsx";
import callSpotifyAPI from "./../services/apiservice.js";

export default function Dashboard({ isImportingMusic }) {
  const accessToken = localStorage.getItem("access_token");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    async function getSpotifyProfilePicture() {
      try {
        const data = await callSpotifyAPI("https://api.spotify.com/v1/me");
        if (data.images.length > 0) {
          const largestImage = data.images.sort((a, b) => b.width - a.width)[0];
          setProfilePicture(largestImage.url);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }
    getSpotifyProfilePicture();
  }, [accessToken]);

  return (
    <div className="dashboard">
      <div className="profile-section">
        <img
          src={profilePicture}
          alt="Spotify Profile"
          className="profile-image"
        />
      </div>

      <div className="instructions">
        <h1>Create A New Playlist OR Select One To Update!</h1>
      </div>

      <div className="loading-bar" hidden={!isImportingMusic}>
        <div className="loading-progress"></div>
      </div>

      <div className="select-playlists">
        <h2 className="text-black"></h2>
        <PlaylistComponent accessToken={accessToken} />
      </div>
    </div>
  );
}
