import React, { createContext, useState, useContext } from 'react';

const LikedSongsContext = createContext();

export const useLikedSongs = () => useContext(LikedSongsContext);

export const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState([]);

    return (
        <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs }}>
            {children}
        </LikedSongsContext.Provider>
    );
};
