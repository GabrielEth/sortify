import { useState, useEffect } from "react";
import "./createplaylist.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useLikedSongs } from "../LikedSongsContext";

const CreatePlaylist = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [likedResult, setLikedResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { likedSongs } = useLikedSongs();

  const placeholderSongs = [
    { name: "Song 1" },
    { name: "Song 2" },
    { name: "Song 3" },
    { name: "Song 4" },
    { name: "Song 5" },
  ];

  const chosenSongMax = 5;

  const handleToggleSong = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((item) => item !== song));
    } else {
      if (selectedSongs.length >= chosenSongMax) {
        alert("You can only select up to 5 songs.");
      } else {
        setSelectedSongs([...selectedSongs, song]);
      }
    }
  };

  const handleLikeResult = (like) => {
    setLikedResult(like);
  };

  const handleExport = () => {
    // Export logic here
  };

  const handleExportPrompt = () => {
    // Recursive function to prompt user until they like the playlist
    if (likedResult === false) {
      setLikedResult(null); // Reset likedResult
      // Prompt the user again for liking the playlist
      handleLikeResult(window.confirm("Do you like your creation now?"));
    }
  };

  // Call handleExportPrompt whenever likedResult changes
  useEffect(() => {
    handleExportPrompt();
  }, [likedResult]);

  const filteredSongs = likedSongs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <h1 className="instructions">Create a Playlist</h1>
      <div className="main">
        <div className="create-playlist-container">
          <div className="scrollable-list">
            <TextField
              fullWidth
              label="Search Songs"
              variant="outlined"
              onChange={handleSearchTermChange}
              sx={{ marginBottom: "1rem" }}
            />
            <table className="songs-table playlist-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Song</th>
                </tr>
              </thead>
              <tbody>
                {placeholderSongs.map((song, index) => (
                  <tr key={index} className="song-item">
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
            {selectedSongs.length === 5 && (
              <button className="sortify-music-btn" onClick={testFunction}>
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylist;
