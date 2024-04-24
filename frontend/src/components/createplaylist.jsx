import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useLikedSongs } from "../LikedSongsContext";
import callSpotifyAPI from "../services/apiservice";
import CircularIndeterminate from "../loading-circle";

const CreatePlaylist = ({ accessToken }) => {
  const { likedSongs } = useLikedSongs();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlistId, setPlaylistId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);
  const [userId, setUserId] = useState(null);

  const placeholderSongs = [
    { name: "Song 1" },
    { name: "Song 2" },
    { name: "Song 3" },
    { name: "Song 4" },
    { name: "Song 5" },
    { name: "Song 6" },
    { name: "Song 7" },
    { name: "Song 8" },
    { name: "Song 9" },
  ];
  const chosenSongMax = 5;
  const handleToggleSong = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((item) => item !== song));
    } else {
      if (selectedSongs.length < 5) {
        setSelectedSongs([...selectedSongs, song]);
      } else {
        alert("You can only select up to 5 songs.");
      }
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setCancelRequested(false);

    try {
      await generatePlaylist(selectedSongs);
    } catch (error) {
      console.error("Error generating playlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlaylist = async (selectedSongs) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check for cancellation at various points during the generation process
    for (let i = 0; i < selectedSongs.length; i++) {
      if (cancelRequested) {
        console.log("Generation cancelled.");
        return;
      }

      // Simulate generating playlist for each selected song
      console.log("Generating playlist for song:", selectedSongs[i]);
      // Your playlist generation logic goes here
    }

    if (cancelRequested) {
      console.log("Generation cancelled.");
      return;
    }

    console.log("Playlist generation completed successfully.");
  };

  const cancelGeneration = () => {
    setCancelRequested(true);
  };

  const filteredSongs = likedSongs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function getSpotifyUserId() {
      try {
        const data = await callSpotifyAPI("https://api.spotify.com/v1/me");
        const spotifyUserId = data.id;
        setUserId(spotifyUserId);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }
    getSpotifyUserId();
  }, [accessToken]);

  const handleExport = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
  
    try {
      //Creating a new playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers: {
          Authorization: "Bearer 1POdFZRZbvb...qqillRxMr2z",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Discover Sortify",
          description: "Highly personalized with Sortify based on your chosen songs",
          public: false
        })
      });
  
      if (!createPlaylistResponse.ok) {
        throw new Error("Failed to create playlist");
      }
  
      const createdPlaylistData = await createPlaylistResponse.json();
      const newPlaylistId = createdPlaylistData.id;
  
      console.log("Playlist created:", createdPlaylistData);
  
      //Add songs to the new playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uris: selectedSongs.map(song => song.uri),
          position: 0
        })
      });
  
      if (!addTracksResponse.ok) {
        throw new Error("Failed to add tracks to playlist");
      }
  
      const addedTracksData = await addTracksResponse.json();
      console.log("Tracks added to playlist:", addedTracksData);
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="instructions main">
        Select 5 songs to base your playlist on
      </h1>
      <div className="main">
        <TextField
          fullWidth
          label="Search Songs"
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
              </tr>
            </thead>
            <tbody>
              {filteredSongs.map((song, index) => (
                <tr key={index}>
                  <td>
                    <Checkbox
                      onChange={() => handleToggleSong(song)}
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
                </tr>
              ))} 
            </tbody>
          </table>
        </div>

        <div className="like-dislike-section main">
          <span>
            <button
              className="sortify-music-btn"
              disabled={isLoading}
              onClick={handleGenerate}
            >
              Generate
            </button>
            {isLoading && (
              <button
                className="sortify-music-btn"
                onClick={cancelGeneration}
              >
                Cancel
              </button>
            )}
            {!isLoading && (
                        <button
                            className="sortify-music-btn"
                            onClick={handleExport}
                        >
                            Export
                        </button>
                    )}
          </span>
        </div>
        {isLoading && <CircularIndeterminate message="Generating you playlist" />}
      </div>
    </>
  );
};


export default CreatePlaylist;
