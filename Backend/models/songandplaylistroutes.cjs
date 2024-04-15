/*
 * Important:
 * ----------
 * - Ensure compliance with Spotify's Web API terms of use.
 * - Always secure user data if adapting this script for web applications.
 * 
 * For algorithm purposes:

 * - id: The Spotify ID for the track, a unique identifier used by Spotify to reference the song.
 * - artists: A list of the names of artists who performed or contributed to the song. Since a track can have multiple artists, this is mapped to an array.
 * - album: The name of the album on which the song appears.
 * - release_date: The date the album was first released, which can vary in precision (e.g., year, year-month, or exact date).
 * - genre: The musical genre(s) associated with the song. As genres are generally associated with artists rather than individual tracks, this would 
 * require additional API calls to the artists' endpoints to fetch.
 * - bpm (Beats Per Minute): The tempo of the song, a measure of how fast or slow the song is, which is a key factor in determining the energy and mood of the track.
 * - danceability: A measure from 0.0 to 1.0 of how suitable a track is for dancing based on musical elements including tempo, rhythm stability, beat 
 * strength, and overall regularity.
 * - energy: A measure from 0.0 to 1.0 that represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.
 * - acousticness: A measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
 * - instrumentalness: Predicts whether a track contains no vocals. Tracks with a value closer to 1.0 are instrumental, whereas values near 0.0 
 * indicate the track contains vocal content.
 * - liveness: Detects the presence of an audience in the recording. Higher values (closer to 1.0) indicate the track was performed live.
 * - loudness: The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful in 
 * understanding the relative volume.
 * - speechiness: Measures the presence of spoken words in a track. A value above 0.66 likely means the track is mostly spoken word 
 * (talk show, audiobook, poetry); a value between 0.33 and 0.66 could indicate both music and speech (such as rap music), and a value 
 * below 0.33 likely means the track is music without speech.
 * - valence: A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more 
 * positive (happy, cheerful, euphoric), while tracks with low valence sound more negative (sad, depressed, angry).
 * - duration_ms: The duration of the track in milliseconds. This is useful for understanding the length of the song.
 * - popularity: A rating from 0 to 100, with 100 being the most popular. The popularity is calculated by Spotify and is based, in 
 * part, on the total number of plays the track has received and how recent those plays are.
 * - explicit: Indicates whether the song contains explicit content (true or false). This is useful for applications that wish to 
 * filter out songs with explicit lyrics.
 */

const express = require("express");
const router = express.Router();

const fetchUserPlaylists = async (accessToken) => {
  const playlists = [];
  let url = "https://api.spotify.com/v1/me/playlists";

  while (url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    playlists.push(
      ...data.items.map((item) => ({
        playlistId: item.id,
        name: item.name,
        tracksHref: item.tracks.href,
      }))
    );
    url = data.next;
  }

  return playlists;
};

async function fetchLikedSongs(accessToken) {
  let likedSongs = [];
  let url = "https://api.spotify.com/v1/me/tracks?limit=50"; // Starting URL, increased limit to 50

  while (url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const batchOfSongs = data.items.map((item) => ({
      name: item.track.name,
      id: item.track.id,
      artistIds: item.track.artists.map((artist) => artist.id),
    }));

    likedSongs = likedSongs.concat(batchOfSongs);

    url = data.next; // Update the URL for the next request
  }

  return likedSongs;
}

async function fetchArtistsGenres(artistIds, accessToken) {
  // Function to split the artistIds array into chunks of 50 elements each
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Splitting artistIds into chunks of 50
  const artistIdChunks = chunkArray(artistIds, 50);

  // Function to fetch genres for a chunk of artist IDs
  const fetchGenresForChunk = async (idsChunk) => {
    const endpoint = `https://api.spotify.com/v1/artists?ids=${idsChunk.join(
      ","
    )}`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.artists.map((artist) => ({
      id: artist.id,
      genres: artist.genres, // Each artist's genres
    }));
  };

  // Fetch genres for all chunks using Promise.all to handle them in parallel
  const results = await Promise.all(
    artistIdChunks.map((idsChunk) => fetchGenresForChunk(idsChunk))
  );

  // Flattening the results array as it will be an array of arrays
  const flattenedResults = results.flat();

  return flattenedResults;
}

async function fetchSongDetails(likedSongs, accessToken) {
  const allArtistIds = [
    ...new Set(likedSongs.flatMap((song) => song.artistIds)),
  ];
  const artistGenres = await fetchArtistsGenres(allArtistIds, accessToken);

  // Helper function to map artist IDs to genres
  const mapArtistIdToGenres = (artistId) => {
    const artist = artistGenres.find((artist) => artist.id === artistId);
    return artist ? artist.genres : [];
  };

  // Function to fetch details for a single song
  const fetchDetailsForSong = async (song) => {
    try {
      const [trackResponse, featuresResponse] = await Promise.all([
        fetch(`https://api.spotify.com/v1/tracks/${song.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }),
        fetch(`https://api.spotify.com/v1/audio-features/${song.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (!trackResponse.ok || !featuresResponse.ok) {
        console.error(`Failed to fetch details for song ID ${song.id}`);
        return null; // Skip this song or handle accordingly
      }

      const [trackData, featuresData] = await Promise.all([
        trackResponse.json(),
        featuresResponse.json(),
      ]);

      const genres = song.artistIds
        .flatMap((id) => mapArtistIdToGenres(id))
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(", ");

      return {
        name: song.name,
        id: song.id,
        artists: trackData.artists.map((artist) => artist.name),
        album: trackData.album.name,
        release_date: trackData.album.release_date,
        genre: genres,
        bpm: featuresData.tempo,
        danceability: featuresData.danceability,
        energy: featuresData.energy,
        acousticness: featuresData.acousticness,
        instrumentalness: featuresData.instrumentalness,
        liveness: featuresData.liveness,
        loudness: featuresData.loudness,
        speechiness: featuresData.speechiness,
        valence: featuresData.valence,
        duration_ms: trackData.duration_ms,
        popularity: trackData.popularity,
        explicit: trackData.explicit,
      };
    } catch (error) {
      console.error(`Error fetching details for song ID ${song.id}:`, error);
      return null; // Skip this song or handle accordingly
    }
  };

  // Fetch details for all songs in parallel, filtering out any null results
  const detailedSongsPromises = likedSongs.map((song) =>
    fetchDetailsForSong(song)
  );
  const detailedSongsResults = await Promise.all(detailedSongsPromises);
  const detailedSongs = detailedSongsResults.filter((song) => song !== null);

  return detailedSongs;
}

router.get("/fetch-playlists", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No authorization token provided" });
    }
    const accessToken = req.header("Authorization").split(" ")[1];

    const playlists = await fetchUserPlaylists(accessToken);
    res.json({
      success: true,
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user playlists",
    });
  }
});

router.get("/fetch-liked-songs", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No authorization token provided" });
    }
    const accessToken = req.header("Authorization").split(" ")[1];

    const likedSongs = await fetchLikedSongs(accessToken);
    res.json({
      success: true,
      likedSongs,
    });
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch liked songs",
    });
  }
});

// Route to fetch song details
router.get("/fetch-song-details", async (req, res) => {
  const accessToken = req.header("Authorization").split(" ")[1];
  try {
    const likedSongsArray = req.body.likedSongs;
    const songDetails = await fetchSongDetails(likedSongsArray, accessToken);
    res.json({
      success: true,
      songDetails,
    });
  } catch (error) {
    console.error("Error fetching song details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch song details",
    });
  }
});

module.exports = {
  router,
  fetchSongDetails,
  fetchLikedSongs,
};
