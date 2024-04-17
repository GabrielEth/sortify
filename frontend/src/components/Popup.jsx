import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import callSpotifyAPI from "../services/apiservice.js";
import './createplaylist.css'; // Import CSS file for styling

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
}));

export default function Popup(props) {
    const { title, openPopup, setOpenPopup } = props;
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [likedResult, setLikedResult] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const accessToken = localStorage.getItem("access_token");
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

    useEffect(() => {
        async function getSpotifyProfilePicture() {
          try {
            const data = await callSpotifyAPI("https://api.spotify.com/v1/me");
            const userId = data.id;
            setUserData(data);
            setUserId(userId);
          } catch (error) {
            console.error("Failed to fetch user profile:", error);
          }
        }
        getSpotifyProfilePicture();
      }, [accessToken]);

    const handleExportPrompt = () => {
        if (likedResult === false) {
            setLikedResult(null);
            handleLikeResult(window.confirm('Do you like your creation now?'));
        }
    };

    useEffect(() => {
        handleExportPrompt();
    }, [likedResult]);
    
    useEffect(() => {
        if (userData && likedResult === true) {
            handleExport();
        }
    }, [userData, likedResult]);

    function createSpotifyPlaylist(playlistName, playlistDescription, isPublic) {
        if (!userData) {
            console.error("User data not available.");
            return;
        }
        const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                description: playlistDescription,
                public: isPublic
            })
        };

        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create playlist');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error creating playlist:', error);
                throw error;
            });
    }

    const handleExport = () => {
        const playlistName = 'New Playlist';
        const playlistDescription = 'New playlist description';
        const isPublic = false;
    
        if (!userData) {
            console.error('User data not available!!');
            return;
        }
        if (userData) {
            createSpotifyPlaylist(playlistName, playlistDescription, isPublic)
                .then(playlistData => {
                    console.log('Playlist created:', playlistData);
                })
                .catch(error => {
                    console.error('Failed to create playlist:', error);
                });
        } else {
            console.error('User data not available. Cannot create playlist.');
        }
    };

    const handleClose = () => {
        setOpenPopup(false);
    };

    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className="create-playlist-container">
                    <div className="content">
                        <h1 className="section-heading">Create Playlist</h1>

                        <div className="playlist-section">
                            <h2 className="subsection-heading">Choose The Playlist You Want To Create</h2>
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

                        {userData && likedResult === true && (
                            <div className="button-section">
                                <button className="export-button" onClick={handleExport}>EXPORT</button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
