# Sortify
  Created by Dylan Bladen, Jason Fuller, Gabriel Garza, Stormie Renevey, Mason Melead
	
## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)


## General Information
- Sortify is an app intended to be used in conjunction with Spotify to create personalized playlists tailored to your desired mood and other related song features. 
- The app is being created for spotify users who want more options for creating playlists based on music they already have. Songs will be pulled from a user's liked songs in their library rather than finding new music.
- We are creating this app with the intent to provide more customization with creating spotify playlists. This will save spotify users a lot of time and provide new types of playlists for them to listen to.


## Technologies Used
- MERN
- Firebase


## Features


# FIRST SPRINT

Dylan Bladen

- Scrum 85: React Research
    - [Scrum 85](https://cs3398s24luna.atlassian.net/browse/SCRUM-85), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/5)
- Scrum 78: Implment Dashboard U/I Skeleton
    - [Scrum 78](https://cs3398s24luna.atlassian.net/browse/SCRUM-78), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/8)
- Scrum 76: Implement Dashboard Route Guard
    - [Scrum 76](https://cs3398s24luna.atlassian.net/browse/SCRUM-76), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/14)
- Scrum 67: Design & Mock a dashboard
    - [Scrum 67](https://cs3398s24luna.atlassian.net/browse/SCRUM-67), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/7)


Stormie Renevey

- Scrum 81: Initialize app by Configuring/Connecting Front & Back End
    - [Scrum 81](https://cs3398s24luna.atlassian.net/browse/SCRUM-81), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/2)
- Scrum 83: Research MERN Stack Application Deployment
    - [Scrum 83](https://cs3398s24luna.atlassian.net/browse/SCRUM-83), [Bitbucket]()
- Scrum 84: Deploy MERN Stack Application (Frontend)
    - [Scrum 84](https://cs3398s24luna.atlassian.net/browse/SCRUM-84), [Bitbucket]()
- Scrum 36: Define 'Buckets' for playlist sorting
    - [Scrum 36](https://cs3398s24luna.atlassian.net/browse/SCRUM-36), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/13)
- Scrum 35: Research Spotify API Song Stats
    - [Scrum 35](https://cs3398s24luna.atlassian.net/browse/SCRUM-35), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/11)


Gabriel Garza

- Scrum 87: Implement U/I Visual
    - [Scrum 87](https://cs3398s24luna.atlassian.net/browse/SCRUM-87)
- Scrum 65: Write a fucntion to store a user's liked songs temporarily
    - [Scrum 65](https://cs3398s24luna.atlassian.net/browse/SCRUM-65)
- Scrum 63: Define Architecture for putting songs in data structure
    - [Scrum 63](https://cs3398s24luna.atlassian.net/browse/SCRUM-63)
- Scrum 51: Research Spotify API
    - [Scrum 51](https://cs3398s24luna.atlassian.net/browse/SCRUM-51)
[Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/4)


Jason Fuller

- Scrum 88: Implement Login Page U/I
    - [Scrum 88](https://cs3398s24luna.atlassian.net/browse/SCRUM-88)
- Scrum 45: Design a clear and intuitive UI flow for users to start the OAuth process, including button or links to "Connect to Spotify."
    - [Scrum 45](https://cs3398s24luna.atlassian.net/browse/SCRUM-45)
- Scrum 44: Implement token refresh logic to ensure the app can maintain access without requiring the user to frequently re-authenticate.
    - [Scrum 44](https://cs3398s24luna.atlassian.net/browse/SCRUM-44)
- Scrum 43: Develop the authentication flow in the app, ensuring it meets Spotify's security standards.
    - [Scrum 43](https://cs3398s24luna.atlassian.net/browse/SCRUM-43)
- Scrum 42: Research Spotify's OAuth 2.0 implementation documentation.
    - [Scrum 42](https://cs3398s24luna.atlassian.net/browse/SCRUM-42) 
[Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/3)


Mason Melead

- Scrum 77: Define Sortify U/X
    - [Scrum 77](https://cs3398s24luna.atlassian.net/browse/SCRUM-77), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/6)
- Scrum 74: Define Everything to be Stored in database
    - [Scrum 74](https://cs3398s24luna.atlassian.net/browse/SCRUM-74)
- Scrum 64: MongoDB Research
    - [Scrum 64](https://cs3398s24luna.atlassian.net/browse/SCRUM-64), [Bitbucket](https://bitbucket.org/cs3398s24luna/sortify/pull-requests/12)


# SECOND SPRINT
Objectives

- Fix redirect from login page
- Unit testing
- Route guard bug fix
- Flesh out dashboard UI more
- Replace dummy data with actual user playlist data
- Further develop sorting algorithms based on the defined buckets
- Database implementation
- Database testing

# tbd
*  Playlist generation based on user's existing song library
*  User's generated playlist will update as user adds to their liked songs on spotify
*  Filter on playlist creation
*  Ability to preview the playlist
*  Ability to push new playlist to Spotify account or cancel


Gabriel Garza

    -Scrum 118: Testing Exporting of Playlists
        -Ensured the exported playlists correctly appeared in Spotify.
        -Scrum 118
    -Scrum 105: Exporting Generated Playlist to Spotify after creating or updating
        -Developed and tested the functionality to export playlists to a user's Spotify account.
        -Scrum 105
    -Scrum 54: Unit Testing of Genres/Songs/Playlists
        -Created unit tests for genres, songs, and playlists to ensure functionality under various conditions.
        -Scrum 54
    -Scrum 94: Pull User's Playlists function (Spotify API call)
        -Implemented a function to retrieve a user's playlists from Spotify.
        -Scrum 94
    -Challenges faced included integrating the OAuth 2.0 flow within the app and resolving authorization errors such as the error 403. After extensive research and collaboration with Dylan Bladen, the functions were integrated and functioned as expected within the app environment.


Bitbucket


## Screenshots



## Setup
What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?

Proceed to describe how to install / setup one's local environment / get started with the project.

`TBD`


## Usage
How does one go about using it?
Provide various use cases and code examples here.

`TBD`


## Project Status
Project is: _in progress_


## Room for Improvement
Include areas you believe need improvement / could be improved. Also add TODOs for future development.

Room for improvement:
- Improvement to be done 1
- Improvement to be done 2

To do:
- Feature to be added 1
- Feature to be added 2


## Acknowledgements
- Thanks to Spotify for the information available via their APIs. Their APIs will be utilized throughout this app.