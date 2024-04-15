const {
  fetchSongDetails,
  fetchLikedSongs,
} = require("../songandplaylistroutes.cjs");
const { kNearestNeighbors } = require("../sorting.cjs");
const accessToken = "";

async function analyzeSongs() {
  try {
    const likedSongs = await fetchLikedSongs(accessToken);
    const detailedSongs = await fetchSongDetails(likedSongs, accessToken);
    const features = detailedSongs.map((song) => [
      song.bpm,
      song.danceability,
      song.energy,
      song.acousticness,
      song.instrumentalness,
      song.liveness,
      song.loudness,
      song.speechiness,
      song.valence,
    ]);

    // Calculate average features
    const averageFeatures = features[0].map((_, i) => {
      return (
        features.reduce((acc, feature) => acc + feature[i], 0) / features.length
      );
    });

    const k = 5; // Number of nearest neighbors to find

    // Execute the k-nearest neighbors function using average features as the query point
    const nearestNeighbors = kNearestNeighbors(
      detailedSongs,
      averageFeatures,
      k
    );

    // Output the results
    console.log("Nearest Neighbors to the Average Song:");
    nearestNeighbors.forEach((neighbor) => {
      console.log(
        `${
          detailedSongs[neighbor.index].name
        } at distance ${neighbor.distance.toFixed(2)}`
      );
    });
  } catch (error) {
    console.error("Failed to analyze songs:", error);
  }
}

analyzeSongs();
