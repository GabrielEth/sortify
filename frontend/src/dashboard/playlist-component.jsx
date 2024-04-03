import { useState, useEffect } from 'react';
import PlaylistTable from './playlist-table.jsx'; 
import LoadingCircle from '../loading-circle.jsx';

const PlaylistComponent = () => {
  const accessToken = localStorage.getItem('access_token');

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
        .catch(() => {
          setIsLoading(false);
          setError('Error fetching playlists');
        });
    }
  }, [accessToken]);

  if (error) return <div>Error: {error}</div>;

  const overlayStyle = { 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentStyle = isLoading ? {
    filter: 'blur(5px)',
    pointerEvents: 'none',
    userSelect: 'none',
  } : {};

  return (
    <>
      <div style={contentStyle}>
        <PlaylistTable playlists={playlists} />
      </div>
      {isLoading && (
        <div style={overlayStyle}>
          <LoadingCircle />
        </div>
      )}
    </>
  );
};

export default PlaylistComponent;
