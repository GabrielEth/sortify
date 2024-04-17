function euclideanDistance(point1, point2) {
  if (point1.length !== point2.length) {
    throw new Error("Points do not have the same dimensions");
  }
  const squaredDiffs = point1.map((val, i) => (val - point2[i]) ** 2);
  return Math.sqrt(squaredDiffs.reduce((acc, val) => acc + val, 0));
}

function kNearestNeighbors(sourceSongs, sampleSongs, k) {
  // Helper function to calculate average features
  function calculateAverageFeatures(songs) {
    const featureSum = songs.reduce((acc, song) => {
      song.features.forEach((feature, index) => {
        acc[index] = (acc[index] || 0) + feature;
      });
      return acc;
    }, []);

    return featureSum.map((sum) => sum / songs.length);
  }

  // Function to find k-nearest neighbors for a single song
  function findNearestForSong(songFeatures, source) {
    const distances = source.map((sourceSong, index) => ({
      index,
      distance: euclideanDistance(sourceSong.features, songFeatures),
    }));

    // Sort by distance
    distances.sort((a, b) => a.distance - b.distance);

    // Return first k sorted points
    return distances.slice(0, k);
  }

  // Calculate average features for sample songs
  const averageFeatures = calculateAverageFeatures(sampleSongs);

  // Map over each sample song to find its k-nearest neighbors from the source
  return sampleSongs.map((sampleSong) => ({
    sampleSongId: sampleSong.id, // Assuming each song has an ID
    neighbors: findNearestForSong(sampleSong.features, sourceSongs),
  }));
}

module.exports = {
  kNearestNeighbors,
};
