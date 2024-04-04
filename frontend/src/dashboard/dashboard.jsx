import { useState, useEffect } from "react";
import "./dashboard.css";
import PlaylistComponent from "./playlist-component.jsx";
import callSpotifyAPI from "./../services/apiservice.js";
import Joyride from 'react-joyride';

export default function Dashboard({ isImportingMusic }) {
  const accessToken = localStorage.getItem("access_token");
  const [profilePicture, setProfilePicture] = useState(null);
  const [runTutorial, setRunTutorial] = useState(true); // State to control the tutorial
  const [steps, setSteps] = useState([
    {
      target: '.profile-section',
      content: 'This is your profile section where you can see your Spotify profile picture.',
      title: 'Profile Section',
    },
    {
      target: '.instructions',
      content: 'Here you can choose to create a new playlist or select one to update.',
      title: 'Create or Update Playlists',
    },
  ]);

  useEffect(() => {
    async function getSpotifyProfilePicture() {
      try {
        const data = await callSpotifyAPI("https://api.spotify.com/v1/me");
        if (data.images.length > 0) {
          const largestImage = data.images.sort((a, b) => b.width - a.width)[0];
          setProfilePicture(largestImage.url);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Handle the error
      }
    }
    getSpotifyProfilePicture();
  }, [accessToken]);

  return (
    <div className="dashboard">

<Joyride
        continuous
        run={runTutorial}
        steps={steps}
        showSkipButton={true}
        showProgress={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      <div className="profile-section">
        <img
          src={profilePicture}
          alt="Spotify Profile"
          className="profile-image"
        />
      </div>

      <div className="instructions">
        <h1>Create A New Playlist OR Select One To Update!</h1>
      </div>

      <div className="loading-bar" hidden={!isImportingMusic}>
        <div className="loading-progress"></div>
      </div>

      <div className="select-playlists">
        <h2 className="text-black"></h2>
        <PlaylistComponent accessToken={accessToken} />
      </div>
    </div>
  );
}
