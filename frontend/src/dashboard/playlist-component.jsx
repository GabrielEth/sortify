import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlaylistTable from './playlist-table.jsx'; 
import LoadingCircle from '../loading-circle.jsx';
import axios from 'axios';

const PlaylistComponent = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPlaylists = async () => {
    try {
      console.log("testing")
      const response = await axios.get('/api/fetch-playlists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response)
    } catch (error) {
      // Handle errors
    }
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
