const { kNearestNeighbors } = require("../models/sorting");

// Sample data: array of objects with titles and feature arrays
const songs = [
  { title: "Song A", features: [0.5, 1.2, 0.3] },
  { title: "Song B", features: [1.1, 0.4, 0.6] },
  { title: "Song C", features: [0.3, 1.5, 0.9] },
];

// Define a query point (features of the song to compare)
const queryPoint = [0.6, 1.0, 0.8];

// Number of nearest neighbors to find
const k = 2;

// Execute the kNearestNeighbors function
const nearestNeighbors = kNearestNeighbors(
  songs.map((song) => song.features),
  queryPoint,
  k
);

// Output the results
console.log("Nearest Neighbors:");
nearestNeighbors.forEach((neighbor) => {
  console.log(
    `${songs[neighbor.index].title} at distance ${neighbor.distance.toFixed(2)}`
  );
});
