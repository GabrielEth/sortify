import { useState, useEffect } from 'react';
import PlaylistTable from './playlist-table.jsx'; 
import LoadingCircle from '../loading-circle.jsx';
import axios from 'axios';

const PlaylistComponent = () => {
  const accessToken = localStorage.getItem('access_token');

  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('/api/fetch-playlists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response);
      return response.data; // Assuming the server response format is { success: true, playlists: [...] }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      throw error; 
    }
  };  

  useEffect(() => {
    if (accessToken) {
      fetchPlaylists()
        .then(data => {
          setIsLoading(true);
          if (data.success) {
            setPlaylists(data.playlists);
          } 
          else {
            // this is being hit
            setError('Failed to fetch playlists');
          }
        })
        .catch((error) => {
          console.error("Error in useEffect:", error);
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
