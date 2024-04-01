import React, { useState, useEffect } from 'react';
import PlaylistTable from './playlist-table.jsx'; 

const PlaylistComponent = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPlaylists = async () => {
    const response = await fetch('http://localhost:5555/fetch-playlists', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  };

  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);
      fetchPlaylists()
        .then(data => {
          setIsLoading(false);
          if (data.success) {
            setPlaylists(data.playlists);
          } else {
            setError('Failed to fetch playlists');
          }
        })
        .catch(error => {
          setIsLoading(false);
          setError('Error fetching playlists');
        });
    }
  }, [accessToken]); // Re-fetch when accessToken changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <PlaylistTable playlists={playlists} />;
};

export default PlaylistComponent;
