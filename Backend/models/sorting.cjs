function euclideanDistance(point1, point2) {
  if (point1.length !== point2.length) {
    throw new Error("Points do not have the same dimensions");
  }
  const squaredDiffs = point1.map((val, i) => (val - point2[i]) ** 2);
  return Math.sqrt(squaredDiffs.reduce((acc, val) => acc + val, 0));
}

// takes a list of songs, formats them to be used for sorting
function formatSongDetails(songs) {
  return songs.map((song) => {
    // Destructure to separate the properties
    const {
      name,
      id,
      artists,
      album,
      genre,
      release_date,
      popularity,
      duration_ms,
      explicit,
      ...audioFeatures
    } = song;

    // Return the new structure
    return {
      name,
      id,
      artists,
      audioFeatures,
    };
  });
}

function calculateCentroid(querySongs) {
  const numSongs = querySongs.length;
  const centroid = {
    //bpm: 0,
    danceability: 0,
    energy: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    loudness: 0,
    speechiness: 0,
    valence: 0,
  };

  // Sum up the values of each feature across all query songs
  for (const song of querySongs) {
    //centroid.bpm += song.bpm; --------------- bpm might not be relevant given other features
    centroid.danceability += song.danceability;
    centroid.energy += song.energy;
    centroid.acousticness += song.acousticness;
    centroid.instrumentalness += song.instrumentalness;
    centroid.liveness += song.liveness;
    centroid.loudness += song.loudness;
    centroid.speechiness += song.speechiness;
    centroid.valence += song.valence;
  }

  // Calculate the average value for each feature
  for (const feature in centroid) {
    centroid[feature] /= numSongs;
  }

  return centroid;
}

function kNearestNeighbors(data, queryList, k) {
  const centroid = calculateCentroid(queryList);

  // Calculate distance from queryPoint to all others
  const distances = data.map((point, index) => ({
    index,
    distance: euclideanDistance(point.features, centroid),
  }));

  // Sort by distance
  distances.sort((a, b) => a.distance - b.distance);

  // Return first k sorted points
  return distances.slice(0, k);
}
