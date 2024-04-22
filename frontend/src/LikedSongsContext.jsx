import { useEffect, createContext, useState, useContext } from 'react';

const LikedSongsContext = createContext();

export const useLikedSongs = () => useContext(LikedSongsContext);

export const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        const savedLikedSongs = localStorage.getItem('likedSongs');
        if (savedLikedSongs) {
          setLikedSongs(JSON.parse(savedLikedSongs));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
      }, [likedSongs]);

    return (
        <LikedSongsContext.Provider value={[likedSongs, setLikedSongs]}>
            {children}
        </LikedSongsContext.Provider>
    );
};

