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

  // Navigate to the create playlist page
  const handleCreateNewPlaylistClick = () => {
    navigate('/createplaylist');
  };

  // Navigate to the update playlist page and pass the playlist name
  const handlePlaylistClick = (playlistName) => {
    navigate('/updateplaylist', { state: { playlistName } });
  };

  return (
    <Container>
      <Row className="g-3">
        {/* Placeholder for "Create New Playlist" card */}
        <Col md={12 / cardsPerRow} onClick={handleCreateNewPlaylistClick} style={{ cursor: 'pointer' }}>
          <Card className="card-hover-effect">
            <Card.Img
              variant="top"
              src={newPlaylist}
              alt="Create New Playlist"
            />
            <Card.Body>
              <Card.Text>Create New Playlist</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Dynamic playlist cards */}
        {playlists.map((playlist, index) => (
          <Col key={index} md={12 / cardsPerRow} onClick={() => handlePlaylistClick(playlist.name)} style={{ cursor: 'pointer' }}>
            <Card className="card-hover-effect">
              <Card.Img
                variant="top"
                src={playlist.imageUrl || "path/to/your/placeholder_image.jpg"}
                alt={playlist.name}
              />
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
