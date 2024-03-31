/**
 * Spotify Liked Songs Fetcher
 * ===========================
 * This module provides functionality to fetch a user's liked songs from Spotify,
 * enrich them with detailed information including audio features and artist genres,
 * and compile this data for further application use, such as playlist creation or music analysis.
 *
 * Functions:
 * -----------
 * - fetchLikedSongs(accessToken): Fetches liked songs for a user given a Spotify access token.
 *   Returns an array of songs with basic information (name, id, and artist IDs).
 *
 * - fetchArtistsGenres(artistIds, accessToken): Fetches genres for a given list of artist IDs.
 *   Returns an array of objects, each containing an artist's ID and their associated genres.
 *
 * - fetchSongDetails(likedSongs, accessToken): Fetches detailed information for each liked song,
 *   including audio features and artist genres. Returns an enriched list of liked songs.
 *
 * Usage:
 * ------
 * 1. Obtain a valid Spotify access token with appropriate permissions to access user's liked songs.
 * 2. Call fetchLikedSongs with the access token to retrieve basic liked songs data.
 * 3. Call fetchSongDetails with the liked songs data and access token to enrich the songs with detailed information.
 *
 * Note:
 * -----
 * This module requires the 'node-fetch' library for making HTTP requests to the Spotify Web API.
 * Ensure that you handle authentication and token refresh appropriately, as this module does not cover token management.
 *
 * Example:
 * --------
 * const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN_HERE';
 * fetchLikedSongs(accessToken)
 *   .then(likedSongs => fetchSongDetails(likedSongs, accessToken))
 *   .then(detailedSongs => console.log(detailedSongs))
 *   .catch(error => console.error('Error fetching song details:', error));
 *
 * Important:
 * ----------
 * - Ensure compliance with Spotify's Web API terms of use.
 * - Always secure user data if adapting this script for web applications.
 * 
 * For algorithm pourposes:
 * ------------------------
 * // name: The title of the song.
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





// Function to fetch the user's liked songs from Spotify
async function fetchLikedSongs(accessToken) {
    const endpoint = 'https://api.spotify.com/v1/me/tracks';
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    const likedSongs = data.items.map(item => ({
        name: item.track.name,
        id: item.track.id,
        artistIds: item.track.artists.map(artist => artist.id) 
      }));
  
    return likedSongs;
  }

  
///////////////////////////////////////////////////////////////////////////////////////////////

async function fetchArtistsGenres(artistIds, accessToken) {
    const endpoint = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.artists.map(artist => ({
        id: artist.id,
        genres: artist.genres // Each artist's genres
    }));
}

///////////////////////////////////////////////////////////////////////////////////////////////

// Function to fetch detailed information for each liked song
async function fetchSongDetails(likedSongs, accessToken) {
    const detailedSongs = [];
    // Collect all unique artist IDs
    const allArtistIds = [...new Set(likedSongs.flatMap(song => song.artistIds))];
    // Fetch genres for all artists
    const artistGenres = await fetchArtistsGenres(allArtistIds, accessToken);

    for (const song of likedSongs) {
        // Fetch basic track information
        const trackEndpoint = `https://api.spotify.com/v1/tracks/${song.id}`;
        const trackResponse = await fetch(trackEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!trackResponse.ok) {
            throw new Error(`HTTP error! status: ${trackResponse.status}`);
        }

        const trackData = await trackResponse.json();

        // Fetch audio features for the track
        const featuresEndpoint = `https://api.spotify.com/v1/audio-features/${song.id}`;
        const featuresResponse = await fetch(featuresEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!featuresResponse.ok) {
            throw new Error(`HTTP error! status: ${featuresResponse.status}`);
        }

        const genres = song.artistIds.flatMap(id => artistGenres[id] || []);
        const featuresData = await featuresResponse.json();

        // Combine the data
        detailedSongs.push({
            name: song.name,
            id: song.id,
            artists: trackData.artists.map(artist => artist.name), // List of artist names
            album: trackData.album.name,
            release_date: trackData.album.release_date,
            genre: genres.join(', '),
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
        });
    }

    return detailedSongs;
}

