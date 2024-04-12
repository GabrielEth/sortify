const { fetchSongDetails } = require("./models/songandplaylistroutes.cjs");
const { kNearestNeighbors } = require("./models/sorting");
const accessToken = "2e214f3d12904dd7ae816282230cb72b"; // Ensure this is securely handled

// Example liked songs array (normally you would fetch this from your app's database or Spotify API)
const likedSongs = [
  { id: "3n3Ppam7vgaVa1iaRUc9Lp", artistIds: ["0oSGxfWSnnOXhD2fKuz2Gy"] },
  { id: "2nLtzopw4rPReszdYBJU6h", artistIds: ["0oSGxfWSnnOXhD2fKuz2Gy"] },
];

async function analyzeSongs() {
  try {
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
    const nearestNeighbors = kNearestNeighbors(features, averageFeatures, k);

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

analyzeSongsUsingAverage();
