import { PlaylistTable } from "./playlist-table";
import { useLocation } from "react-router-dom";
import "./dashboard.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Dashboard({ isImportingMusic }) {
  const query = useQuery();
  const accessToken = query.get("access_token");
  const refreshToken = query.get("refresh_token");

  return (
    <div className="dashboard">
      <div className="profile-section">
        {/* Placeholder for user's Spotify profile image */}
        <img
          src="path/to/spotify/profile/image.jpg"
          className="profile-image"
        />
      </div>
      <div className="import-container">
        <button className="sortify-music-btn">Import Music</button>
      </div>

      <div className="loading-bar" hidden={!isImportingMusic}>
        <div className="loading-progress"></div>
      </div>

      <div className="select-playlists">
        <h2 className="text-black">
          Select Playlists you would like to include in your generated playlist
        </h2>
        {<PlaylistTable />}
      </div>
    </div>
  );
}
