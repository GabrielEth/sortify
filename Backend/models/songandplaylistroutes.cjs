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

function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function fetchWithRetry(url, accessToken) {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 429) {
    // 429 is the status code for rate limiting
    console.log(
      "fetching failed - 429 error retry-after is ",
      response.headers.get("Retry-After")
    );
    const retryAfter = parseInt(response.headers.get("Retry-After"));
    if (retryAfter) {
      await sleep(retryAfter);
      return fetchWithRetry(url, accessToken); // Recursively retry the request after the specified delay
    }
  }

  return response;
}

const fetchUserPlaylists = async (accessToken) => {
  const playlists = [];
  let url = "https://api.spotify.com/v1/me/playlists?limit=50";

  while (url) {
    const response = await fetchWithRetry(url, accessToken);
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
    const response = await fetchWithRetry(url, accessToken);

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
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Splitting artistIds into chunks of 50
  const artistIdChunks = chunkArray(artistIds, 50);

  const fetchGenresForChunk = async (idsChunk) => {
    const endpoint = `https://api.spotify.com/v1/artists?ids=${idsChunk.join(
      ","
    )}`;
    const response = await fetchWithRetry(endpoint, accessToken);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.artists.map((artist) => ({
      id: artist.id,
      genres: artist.genres,
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
  const songIdChunks = chunkArray(songIds, 50);

  // Limit to only the first chunk of up to 100 song IDs
  // const firstChunk = songIdChunks[0] ? songIdChunks[0] : [];

  // Now, songIdChunks is a 2d array, where each sub-array has up to 100 song IDs.
  const trackIdStrings = songIdChunks.map((chunk) => chunk.join(","));

  // Initialize arrays to hold the responses for tracks and features
  let allTrackDetails = [];
  let allFeaturesDetails = [];

  for (let index = 0; index < trackIdStrings.length; index++) {
    const trackIdString = trackIdStrings[index];
    try {
      // Fetch track details for the current chunk
      const trackResponse = await fetchWithRetry(
        `https://api.spotify.com/v1/tracks?ids=${trackIdString}`,
        accessToken
      );

      const featuresResponse = await fetchWithRetry(
        `https://api.spotify.com/v1/audio-features?ids=${trackIdString}`,
        accessToken
      );

      const trackData = await trackResponse.json();
      const featuresData = await featuresResponse.json();

      allTrackDetails.push(...trackData.tracks);
      allFeaturesDetails.push(...featuresData.audio_features);
    } catch (error) {
      console.error(`Error fetching data for chunk: `, index, error);
      // Handle error, for example by breaking the loop or continuing to the next chunk
    }
  }

  // At this point, allTrackDetails and allFeaturesDetails contain the details and features for all tracks// At this point, allTrackDetails and allFeaturesDetails contain the details and features for all tracks
  const detailedSongs = allTrackDetails.map((track, index) => {
    const { album, available_markets, duration_ms, ...rest } = track;
    // Map over the artists to include only their name and id
    const simplifiedArtists = track.artists.map(({ name, id }) => ({
      name,
      id,
    }));
    return {
      ...rest,
      artists: simplifiedArtists,
      features: allFeaturesDetails[index],
    };
  });

  return detailedSongs;
}

async function fetchFirstTrackImage(tracksHref, accessToken) {
  try {
    const response = await fetchWithRetry(tracksHref + '?limit=1', accessToken);
    const data = await response.json();
    if (data.items.length > 0 && data.items[0].track.album.images.length > 0) {
      return data.items[0].track.album.images[0].url;
    } else {
      return 'path_to_default_image'; // Default image path if no image found
    }
  } catch (error) {
    console.error('Error fetching first track image:', error);
    return 'path_to_default_image'; // Default image path on error
  }
}

async function fetchPlaylistsWithFirstTrackImage(accessToken) {
  const playlists = await fetchUserPlaylists(accessToken);
  const playlistsWithImages = await Promise.all(playlists.map(async (playlist) => {
    const imageUrl = await fetchFirstTrackImage(playlist.tracksHref, accessToken);
    return { ...playlist, imageUrl };
  }));
  return playlistsWithImages;
}

router.get("/fetch-playlists", async (req, res) => {
  try {
    const accessToken = req.header("Authorization").split(" ")[1]; // Extract access token
    const playlists = await fetchPlaylistsWithFirstTrackImage(accessToken);
    res.json({
      success: true,
      playlists,
    });
  } catch (error) {
    console.error("Error fetching playlists with images:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user playlists with images",
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

    const likedSongs = await fetchLikedSongs(accessToken);

    console.log("getting song details");
    const songDetails = await fetchSongDetails(likedSongs, accessToken);

    res.json({
      success: true,
      likedSongs: songDetails,
    });
  } catch (error) {
    console.error("Error fetching liked songs and details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch liked songs and details",
    });
  }
});

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
