import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import "./playlist-table.css";

import newPlaylist from '../../../Resources/newPlaylist.png'


export function PlaylistTable({ playlists }) {

  const cardsPerRow = 5; // Set the minimum number of cards per row

  return (
    <Container>
      <Row>

        <Col>
        <Card>
        <Card.Img variant="top" src={newPlaylist} />
        <Card.Body>
          <Card.Text>
            Create New Playlist
          </Card.Text>
        </Card.Body>
      </Card>
        </Col>

        <Col><Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Text>
            Alt
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>

      <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Text>
            Sad Boy Hours
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
      </Row>
      <Row>
      <Col>
        <Card>
        <Card.Img variant="top" src='holder.js/100px180' />
        <Card.Body>
          <Card.Text>
            Gym
          </Card.Text>
        </Card.Body>
      </Card>
        </Col>

        <Col><Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Text>
            Summer 2023
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>

      <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Text>
            ❤️‍🔥
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
  );
}