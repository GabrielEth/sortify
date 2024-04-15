function euclideanDistance(point1, point2) {
  if (point1.length !== point2.length) {
    throw new Error("Points do not have the same dimensions");
  }
  const squaredDiffs = point1.map((val, i) => (val - point2[i]) ** 2);
  return Math.sqrt(squaredDiffs.reduce((acc, val) => acc + val, 0));
}

function kNearestNeighbors(data, queryPoint, k) {
  // Calculate distance from queryPoint to all others
  const distances = data.map((point, index) => ({
    index,
    distance: euclideanDistance(point.features, queryPoint),
  }));

  // Sort by distance
  distances.sort((a, b) => a.distance - b.distance);

  // Return first k sorted points
  return distances.slice(0, k);
}

module.exports = {
  kNearestNeighbors,
};
