import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./playlist-table.css";

import newPlaylist from "../../../Resources/newPlaylist.png";

const PlaylistTable = ({ playlists }) => {
  const cardsPerRow = 5;

  return (
    <Container>
      <Row className="g-3">
        {/* Placeholder for "Create New Playlist" card */}
        <Col md={12 / cardsPerRow}>
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
          <Col key={index} md={12 / cardsPerRow}>
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
