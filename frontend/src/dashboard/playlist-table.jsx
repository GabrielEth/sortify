import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';

import "./playlist-table.css";
import newPlaylist from "../../../Resources/newPlaylist.png";

const PlaylistTable = ({ playlists }) => {
  const cardsPerRow = 5;
  const navigate = useNavigate();

  const handleCreateNewPlaylistClick = () => {
    navigate('/createplaylist');
  };

  const handlePlaylistClick = (playlistName) => {
    navigate('/updateplaylist', { state: { playlistName } });
  };

  return (
    <Container>
      <Row className="g-3">
        <Col md={12 / cardsPerRow} className="playlist-card" onClick={handleCreateNewPlaylistClick} style={{ cursor: 'pointer' }}>
          <Card className="card-hover-effect">
            <Card.Img variant="top" src={newPlaylist} alt="Create New Playlist" />
            <Card.Body>
              <Card.Text>Create New Playlist</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {playlists.map((playlist, index) => (
          <Col key={index} md={12 / cardsPerRow} className="playlist-card" onClick={() => handlePlaylistClick(playlist.name)} style={{ cursor: 'pointer' }}>
            <Card className="card-hover-effect">
              <Card.Img variant="top" src={playlist.imageUrl || "path/to/your/placeholder_image.jpg"} alt={playlist.name} />
              <Card.Body>
                <Card.Title>{playlist.name}</Card.Title>
                <Card.Text>{playlist.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlaylistTable;
