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
    

    const value = {
        likedSongs, 
        setLikedSongs,
    };

    return (
        <LikedSongsContext.Provider value={value}>
            {children}
        </LikedSongsContext.Provider>
    );
};

