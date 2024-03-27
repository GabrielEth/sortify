# Sorting Algorithms Research

## Motivation

1. I'm doing this research because I'm not sure which algorithm to use for our sorting purpose
2. I expect to decide which approach I want to use to sort the songs based on the features provide by the Spotify API
3. I expect to use this plan of approach to implement the chosen sorting algorithm
4. SCRUM 101, 102
5. This research was done by Mason Melead

## Overview

Possible approaches are:

- TOPSIS - Technique for Order of Preference by Similarity to Ideal Solution
- K Nearest Neighbors
- Dimensionality Reduction (PCA or t-SNE) - can be combined with another approach to improve performance
- Deep Learning models

### TOPSIS

- TOPSIS seems to be a good approach to this problem
- Steps for implementation are:
  - Define criteria: these are the features provided by spotify
  - Structure decision matrix: create a pandas dataframe where rows represent songs in the user's library, and columns represent the chosen features
  - Normalize Data
  - Determine weights: determine which features matter more/less
  - Use sample songs as ideal/nadir solutions
  - calculate distances and similarity scores
  - Rank songs according to similarity scores

Maybe user can input weights?
