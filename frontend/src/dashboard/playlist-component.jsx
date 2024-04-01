import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlaylistTable from './playlist-table.jsx'; 
import LoadingCircle from '../loading-circle.jsx';


const PlaylistComponent = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

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

  return (
    <div>
      {isLoading ? (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <LoadingCircle />
        </div>
      ) : (
        <PlaylistTable playlists={playlists} />
      )}
    </div>
  );
};

export default PlaylistComponent;
