import { useState } from "react"; // Import useState and useEffect from React
import "./createplaylist.css"; // Import CSS file for styling
import callSpotifyAPI from "../services/apiservice.js";

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
    const accessToken = localStorage.getItem("access_token");
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [likedResult, setLikedResult] = useState(null);
    const [userId, setUserId] = useState(null);


    const playlists = ['Playlist 1', 'Playlist 2', 'Playlist 3']; // Placeholder for pre-existing playlists
    const placeholderResult = ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5']; // Placeholder for result

    useEffect(() => {
      async function getSpotifyProfilePicture() {
        try {
          const data = await callSpotifyAPI("https://api.spotify.com/v1/me");
          
            userId = data.id;
            setUserId(userId);
          
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
      getSpotifyProfilePicture();
    }, [accessToken]);

    const handleAddSong = (song) => {
        if (selectedSongs.length < 5 && !selectedSongs.includes(song)) {
            setSelectedSongs([...selectedSongs, song]);
        }
    };

    const handleRemoveSong = (song) => {
        setSelectedSongs(selectedSongs.filter(item => item !== song));
    };

    const handleLikeResult = (like) => {
        setLikedResult(like);
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
  // selectedSongs.length != chosenSongMax;

  const handleGenerate = (selectedSongs) => {
    if (!isGenerateDisabled) {
      // Add logic to generate playlist
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
              disabled={isGenerateDisabled}
              onClick={handleGenerate(selectedSongs)}
            >
              Generate
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylist;
