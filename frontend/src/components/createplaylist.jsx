import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useLikedSongs } from "../LikedSongsContext";
import callSpotifyAPI from "../services/apiservice";
import CircularIndeterminate from "../loading-circle";

const CreatePlaylist = () => {
  const { likedSongs } = useLikedSongs();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cancelRequested, setCancelRequested] = useState(false);

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
          </span>
        </div>

        {isLoading && <CircularIndeterminate message="Generating you playlist" />}
      </div>
    </>
  );
};

export default CreatePlaylist;
