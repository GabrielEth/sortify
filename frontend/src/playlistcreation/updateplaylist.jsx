import React, { useState } from "react";
import "./createplaylist.css";

const UpdatePlaylist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [likedResult, setLikedResult] = useState(null);
  const playlists = ["Playlist 1", "Playlist 2", "Playlist 3"];
  const placeholderSongs = ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"];
  const placeholderResult = [
    "Result 1",
    "Result 2",
    "Result 3",
    "Result 4",
    "Result 5",
  ];

  const handleAddSong = (song) => {
    if (selectedSongs.length < 5 && !selectedSongs.includes(song)) {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const handleRemoveSong = (song) => {
    setSelectedSongs(selectedSongs.filter((item) => item !== song));
  };

  const handleLikeResult = (like) => {
    setLikedResult(like);
  };

  const handleExport = async () => {
    if (!selectedPlaylist) {
      console.error("No playlist selected.");
      return;
    }

    try {
      const playlistId = selectedPlaylist; 

      // Extract URIs of the selected songs
      const songURIs = selectedSongs.map((song) => {
        // Assuming each song object has a URI property
        return song.uri;
      });

      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer 1POdFZRZbvb...qqillRxMr2z",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: songURIs,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update playlist");
      }

      const data = await response.json();
      console.log("Playlist updated:", data);
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
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
  React.useEffect(() => {
    handleExportPrompt();
  }, [likedResult]);
  return (
    <div className="create-playlist-container">
      <div className="content">
        <h1 className="section-heading">Update Playlist</h1>
        <div className="playlist-section">
          <h2 className="subsection-heading">
            Choose The Playlist You Want To Update
          </h2>
          <select
            className="dropdown"
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">Select Playlist</option>
            {playlists.map((playlist, index) => (
              <option key={index} value={playlist}>
                {playlist}
              </option>
            ))}
          </select>
        </div>
        {selectedPlaylist && (
          <div className="songs-section">
            <h2 className="subsection-heading">Pick 5 Songs</h2>
            <div className="scrollable-list">
              {placeholderSongs.map((song, index) => (
                <div key={index} className="song-item">
                  <label className="song-label">
                    <input
                      type="checkbox"
                      onChange={() => handleAddSong(song)}
                      checked={selectedSongs.includes(song)}
                    />
                    {song}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedSongs.length > 0 && (
          <div className="result-section">
            <h2 className="subsection-heading">Result</h2>
            <div className="scrollable-list">
              {selectedSongs.map((song, index) => (
                <div key={index} className="result-item">
                  {song}
                </div>
              ))}
              {placeholderResult.map((result, index) => (
                <div key={index} className="result-item">
                  {result}
                </div>
              ))}
            </div>
            <div className="like-dislike-section">
              <label className="like-dislike-label">
                Do You Like Your Creation?
              </label>
              <div className="like-dislike-buttons">
                <button
                  className="like-button"
                  onClick={() => handleLikeResult(true)}
                >
                  Yes
                </button>
                <button
                  className="dislike-button"
                  onClick={() => handleLikeResult(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {likedResult === true && (
          <div className="button-section">
            <button className="export-button" onClick={handleExport}>
              EXPORT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpdatePlaylist;
