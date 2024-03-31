// Function calls and logging results

import fetch from 'node-fetch'; 
import dotenv from 'dotenv'; 
dotenv.config(); 
const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

// Paste your functions here: fetchLikedSongs, fetchArtistsGenres, and fetchSongDetails


// Test fetchLikedSongs
async function testFetchLikedSongs() {
    try {
      const likedSongs = await fetchLikedSongs(accessToken);
      console.log("Liked Songs:", likedSongs);
    } catch (error) {
      console.error("Error fetching liked songs:", error.message);
    }
  }
  
  // Test fetchArtistsGenres with a dummy array of artist IDs
  async function testFetchArtistsGenres() {
    try {
      const artistGenres = await fetchArtistsGenres(['PUT_ARTIST_IDS_HERE'], accessToken);
      console.log("Artist Genres:", artistGenres);
    } catch (error) {
      console.error("Error fetching artist genres:", error.message);
    }
  }
  
  // Since fetchSongDetails relies on the output of fetchLikedSongs, you might want to call it within testFetchLikedSongs or separately after ensuring you have liked songs data
  async function testFetchSongDetails() {
    try {
      const likedSongs = await fetchLikedSongs(accessToken); // Assuming this returns liked songs
      const detailedSongs = await fetchSongDetails(likedSongs, accessToken);
      console.log("Detailed Songs:", detailedSongs);
    } catch (error) {
      console.error("Error fetching song details:", error.message);
    }
  }
  
  // Run tests
  testFetchLikedSongs();
  // testFetchArtistsGenres(); Uncomment and use valid artist IDs
  // testFetchSongDetails(); Uncomment if needed
  