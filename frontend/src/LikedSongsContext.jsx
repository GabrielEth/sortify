import React, { createContext, useState, useContext } from 'react';

const LikedSongsContext = createContext();

export const useLikedSongs = () => useContext(LikedSongsContext);

export const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [hasFetchedSongs, setHasFetchedSongs] = useState(false);  // Track if songs have been fetched

    return (
        <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs, hasFetchedSongs, setHasFetchedSongs }}>
            {children}
        </LikedSongsContext.Provider>
    );
};
