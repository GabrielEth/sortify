import { useEffect, createContext, useState, useContext } from "react";

const LikedSongsContext = createContext();

export const useLikedSongs = () => useContext(LikedSongsContext);

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState(() => {
    const storedLikedSongs = localStorage.getItem("likedSongs");
    return storedLikedSongs ? JSON.parse(storedLikedSongs) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    const storedLikedSongs = JSON.parse(localStorage.getItem("likedSongs"));
    if (storedLikedSongs) {
      setLikedSongs(storedLikedSongs);
    }
  }, []);

  return (
    <LikedSongsContext.Provider value={{likedSongs, setLikedSongs}}>
      {children}
    </LikedSongsContext.Provider>
  );
};
