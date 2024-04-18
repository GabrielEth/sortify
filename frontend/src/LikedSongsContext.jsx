import React, { createContext, useState, useContext } from 'react';

const LikedSongsContext = createContext();

export const useLikedSongs = () => {
    const { likedSongs, setLikedSongs } = useContext(LikedSongsContext);
    return { likedSongs, setLikedSongs };
};

export const useHasFetchedSongs = () => {
    const { hasFetchedSongs, setHasFetchedSongs } = useContext(LikedSongsContext);
    return { hasFetchedSongs, setHasFetchedSongs };
};

export const LikedSongsProvider = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [hasFetchedSongs, setHasFetchedSongs] = useState(false);  // Track if songs have been fetched

    const value = {
        likedSongs, 
        setLikedSongs, 
        hasFetchedSongs, 
        setHasFetchedSongs
    };

    return (
        <LikedSongsContext.Provider value={value}>
            {children}
        </LikedSongsContext.Provider>
    );
};
