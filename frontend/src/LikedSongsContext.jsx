import { useEffect, createContext, useState, useContext } from "react";

const LikedSongsContext = createContext();

export const useLikedSongs = () => useContext(LikedSongsContext);

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState(() => {
    const storedLikedSongs = localStorage.getItem("likedSongs");
    return storedLikedSongs && storedLikedSongs !== "undefined" ? JSON.parse(storedLikedSongs) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  return (
    <LikedSongsContext.Provider value={{likedSongs, setLikedSongs}}>
      {children}
    </LikedSongsContext.Provider>
  );
};
