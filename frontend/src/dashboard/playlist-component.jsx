import { useState, useEffect } from "react";
import PlaylistTable from "./playlist-table.jsx";
import LoadingCircle from "../loading-circle.jsx";
import callSpotifyAPI from "../services/apiservice.js";
import defaultPlaylistImage from "../../../Resources/defaultplaylistimage.png";

const PlaylistComponent = () => {
  const accessToken = localStorage.getItem("access_token");

  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchFirstTrackImage(tracksHref, accessToken) {
    try {
      const response = await fetchWithRetry(tracksHref + '?limit=1', accessToken); // Fetch only the first track
      const data = await response.json();
      if (data.items.length > 0 && data.items[0].track.album.images.length > 0) {
        return data.items[0].track.album.images[0].url; // Return the URL of the first image of the album
      } else {
        return null; // Return null if no image is found
      }
    } catch (error) {
      console.error('Error fetching first track image:', error);
      return null;
    }
  }
  
  

  const fetchPlaylists = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await callSpotifyAPI("/api/fetch-playlists");
      if (response && response.success) {
        const promises = response.playlists.map(async (playlist) => {
          const imageUrl = await fetchFirstTrackImage(playlist.id);
          return {
            ...playlist,
            imageUrl,
          };
        });
        const playlistsWithImages = await Promise.all(promises);
        setPlaylists(playlistsWithImages);
      } else {
        setError("Failed to fetch playlists");
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setError("Error fetching playlists");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (playlists.length === 0 && accessToken) {
      fetchPlaylists();
    }
  }, [accessToken, playlists.length]);

  if (error) return <div>Error: {error}</div>;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = isLoading
    ? {
        filter: "blur(5px)",
        pointerEvents: "none",
        userSelect: "none",
      }
    : {};

  return (
    <>
      <div style={contentStyle}>
        <PlaylistTable playlists={playlists} />
      </div>
      {isLoading && (
        <div style={overlayStyle}>
          <LoadingCircle />
        </div>
      )}
    </>
  );
};

export default PlaylistComponent;
