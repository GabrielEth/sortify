import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useLikedSongs } from "../LikedSongsContext";
import CircularIndeterminate from "../loading-circle";
import "./createplaylist.css";

const CreatePlaylist = () => {
  const { likedSongs } = useLikedSongs();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [songsForPlaylist, setSongsForPlaylist] = useState([]);
  const [generatedPlaylist, setGeneratedPlaylist] = useState();

  const chosenSongMax = 5;

  const handleToggleSong = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((item) => item !== song));
    } else {
      if (selectedSongs.length < chosenSongMax) {
        setSelectedSongs([...selectedSongs, song]);
      } else {
        alert("You can only select up to 5 songs.");
      }
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const generatePlaylist = async (songsForPlaylist) => {
    setIsLoading(true);
    setCancelRequested(false);
    const accessToken = localStorage.getItem("access_token");
    const sourceData = sessionStorage.getItem("likedSongs");
    const sampleData = selectedSongs;
    try {
      const response = await fetch("http://localhost:5555/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Ensure the token is included in the Authorization header
        },
        body: JSON.stringify({
          userId,
          playlistDetails,
          sourceData,
          sampleData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists`, {
        method: "POST",
        headers: {
          Authorization: "Bearer 1POdFZRZbvb...qqillRxMr2z",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "My New Playlist",
          public: false,
          description: "Playlist description",
          tracks: songsForPlaylist.map((song) => song.uri),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const data = await response.json();

      const playlistId = data.id;

      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 1POdFZRZbvb...qqillRxMr2z",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: songsForPlaylist.map((song) => song.uri),
          }),
        }
      );

      if (!addTracksResponse.ok) {
        throw new Error("Failed to add tracks to playlist");
      }
    } catch (error) {
      console.error("Error creating or updating playlist:", error);
    } finally {
      setIsLoading(false);
    }

    if (cancelRequested) {
      return;
    }
  };

  const cancelGeneration = () => {
    setCancelRequested(true);
  };

  const filteredSongs = likedSongs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artists[0].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="instructions main">
        Select 5 songs to base your playlist on
      </h1>
      <div className="main">
        <TextField
          fullWidth
          label="Search Songs or Artists"
          variant="outlined"
          onChange={handleSearchTermChange}
          sx={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#d8f3dc",
            marginBottom: ".5rem",
            borderRadius: ".75rem",
            width: "89%",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <div
          className="selected-songs-box"
          style={{
            backgroundColor: "#081c15",
            padding: "1rem",
            borderRadius: ".75rem",
            color: "#ffffff",
            marginLeft: "4rem",
          }}
        >
          <p style={{ color: "#d8f3dc", fontWeight: "bold" }}>
            Selected Songs: {selectedSongs.map((song) => song.name).join(", ")}
          </p>
        </div>
        <div className="create-playlist-container">
          <table className="playlist-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Song</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {filteredSongs.map((song, index) => (
                <tr
                  key={index}
                  onClick={() => handleToggleSong(song)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <Checkbox
                      checked={selectedSongs.includes(song)}
                      color="primary"
                      sx={{
                        color: "#000000",
                        "&.Mui-checked": { color: "#52b788" },
                        marginRight: "2rem",
                      }}
                    />
                  </td>
                  <td>{song.name}</td>
                  <td>{song.artists[0].name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="like-dislike-section main">
          <span>
            <button
              className="sortify-music-btn"
              disabled={selectedSongs.length != chosenSongMax}
              onClick={() => generatePlaylist(songsForPlaylist)}
              style={{
                opacity: selectedSongs.length != chosenSongMax ? 0.2 : 1,
              }}
            >
              Generate
            </button>
            {isLoading && (
              <button
                className="sortify-music-btn"
                onClick={() => cancelGeneration()}
              >
                Cancel
              </button>
            )}
          </span>
        </div>
        {isLoading && (
          <CircularIndeterminate message="Generating your playlist" />
        )}
      </div>
    </>
  );
};

export default CreatePlaylist;
