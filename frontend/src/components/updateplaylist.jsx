import React, { useState } from 'react';
import './createplaylist.css'; // Import CSS file for styling

const CreatePlaylist = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [likedResult, setLikedResult] = useState(null);

    const playlists = ['Playlist 1', 'Playlist 2', 'Playlist 3']; // Placeholder for pre-existing playlists
    const placeholderSongs = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5']; // Placeholder for songs
    const placeholderResult = ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5']; // Placeholder for result

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

    const handleExportPrompt = () => {
        // Recursive function to prompt user until they like the playlist
        if (likedResult === false) {
            setLikedResult(null); // Reset likedResult
            // Prompt the user again for liking the playlist
            handleLikeResult(window.confirm('Do you like your creation now?'));
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
                    <h2 className="subsection-heading">Choose The Playlist You Want To Update</h2>
                    <select className="dropdown" value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                        <option value="">Select Playlist</option>
                        {playlists.map((playlist, index) => (
                            <option key={index} value={playlist}>{playlist}</option>
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
                                        <input type="checkbox" onChange={() => handleAddSong(song)} checked={selectedSongs.includes(song)} />
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
                                <div key={index} className="result-item">{song}</div>
                            ))}
                            {placeholderResult.map((result, index) => (
                                <div key={index} className="result-item">{result}</div>
                            ))}
                        </div>
                        <div className="like-dislike-section">
                            <label className="like-dislike-label">Do You Like Your Creation?</label>
                            <div className="like-dislike-buttons">
                                <button className="like-button" onClick={() => handleLikeResult(true)}>Yes</button>
                                <button className="dislike-button" onClick={() => handleLikeResult(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )}

                {likedResult === true && (
                    <div className="button-section">
                        <button className="export-button" onClick={handleExport}>EXPORT</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePlaylist;
