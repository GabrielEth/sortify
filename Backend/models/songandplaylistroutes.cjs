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
  let url = "https://api.spotify.com/v1/me/playlists?limit=50";

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

async function fetchSongDetails(songList, accessToken) {
  // Function to chunk an array into smaller arrays of a specified size
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Get an array of song ids from likedSongs
  const songIds = songList.map((song) => song.id);

  // Split songIds into chunks of 100
  const songIdChunks = chunkArray(songIds, 100);

  // Now, songIdChunks is a 2d array, where each sub-array has up to 100 song IDs.
  // You can map over songIdChunks to create comma-separated strings for each chunk if needed for API requests.
  const trackIdStrings = songIdChunks.map((chunk) => chunk.join(","));

  // Initialize arrays to hold the responses for tracks and features
  let allTrackDetails = [];
  let allFeaturesDetails = [];

  for (const trackIdString of trackIdStrings) {
    try {
      // Fetch track details for the current chunk
      const trackResponse = await fetch(
        `https://api.spotify.com/v1/tracks?ids=${trackIdString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the track details response is OK
      if (!trackResponse.ok) {
        throw new Error(
          `HTTP error on fetching track details! status: ${trackResponse.status}`
        );
      }

      // Fetch audio features for the current chunk
      const featuresResponse = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${trackIdString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the audio features response is OK
      if (!featuresResponse.ok) {
        throw new Error(
          `HTTP error on fetching audio features! status: ${featuresResponse.status}`
        );
      }

      // Parse JSON responses
      const trackData = await trackResponse.json();
      const featuresData = await featuresResponse.json();

      // Accumulate the results
      allTrackDetails.push(...trackData.tracks);
      allFeaturesDetails.push(...featuresData.audio_features);
    } catch (error) {
      console.error(`Error fetching data for chunk: ${trackIdString}`, error);
      // Handle error, for example by breaking the loop or continuing to the next chunk
    }
  }

  // At this point, allTrackDetails and allFeaturesDetails contain the details and features for all tracks
  const detailedSongs = allTrackDetails.map((track, index) => {
    return {
      ...track,
      features: allFeaturesDetails[index],
    };
  });

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

router.get("/fetch-liked-songs-and-details", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No authorization token provided" });
    }
    const accessToken = req.header("Authorization").split(" ")[1];

    // Fetch liked songs
    const likedSongs = await fetchLikedSongs(accessToken);

    // Fetch details for the liked songs
    const songDetails = await fetchSongDetails(likedSongs, accessToken);

    res.json({
      success: true,
      likedSongs: songDetails, // Return the detailed liked songs
    });
  } catch (error) {
    console.error("Error fetching liked songs and details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch liked songs and details",
    });
  }
});

//routes for playlist creation and updating
router.post("/create-playlist", async (req, res) => {
  const userId = req.body.userId;
  const accessToken = req.header("Authorization").split(" ")[1];
  const playlistDetails = req.body.playlistDetails;
  const trackUris = req.body.trackUris;

  try {
    const playlistId = await exportPlaylistToSpotify(
      userId,
      accessToken,
      playlistDetails,
      trackUris
    );
    res.json({
      success: true,
      playlistId: playlistId,
      message: "Playlist created successfully",
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create playlist",
    });
  }
});

router.post("/update-playlist", async (req, res) => {
  const accessToken = req.header("Authorization").split(" ")[1];
  const playlistId = req.body.playlistId;
  const trackUris = req.body.trackUris;

  try {
    const updatedPlaylistId = await updatePlaylistOnSpotify(
      accessToken,
      playlistId,
      trackUris
    );
    res.json({
      success: true,
      playlistId: updatedPlaylistId,
      message: "Playlist updated successfully",
    });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update playlist",
    });
  }
});

module.exports = router;
