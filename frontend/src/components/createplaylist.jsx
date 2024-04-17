import { useState } from "react"; // Import useState and useEffect from React
import "./createplaylist.css"; // Import CSS file for styling
import Checkbox from "@mui/material/Checkbox"; // Import Checkbox component from Material-UI
import TextField from "@mui/material/TextField"; // Import TextField component from Material-UI
import { useLikedSongs } from "../LikedSongsContext"; // Import custom hook for liked songs context

const CreatePlaylist = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { likedSongs } = useLikedSongs();

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
      if (selectedSongs.length >= chosenSongMax) {
        alert("You can only select up to 5 songs.");
      } else {
        setSelectedSongs([...selectedSongs, song]);
      }
    }
  };

  const handleExport = () => {
    // Export logic here
  };
 
  const filteredSongs = likedSongs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isGenerateDisabled = false;
  //  selectedSongs.length != chosenSongMax;

  const handleGenerate = () => {
    if (!isGenerateDisabled) {
      // Add logic to generate playlist
    }
  };

  return (
    <>
      <h1 className="instructions main">Select 5 songs to base your playlist on</h1>
      <div className="main">
        <div className="create-playlist-container">
          <div className="scrollable-list">
            <TextField
              fullWidth
              label="Search Songs"
              variant="outlined"
              onChange={handleSearchTermChange}
              sx={{ marginBottom: "1rem", fontFamily: "Arial, sans-serif", backgroundColor: "#d8f3dc", border: "1px solid black"}}
            />
            <table className="playlist-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Song</th>
                </tr>
              </thead>
              <tbody>
                {placeholderSongs.map((song, index) => (
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
              <button className="sortify-music-btn" disabled={isGenerateDisabled} onClick={handleGenerate}>
                Generate
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylist;
