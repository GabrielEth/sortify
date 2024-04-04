import { Container } from "react-bootstrap";
import Logo from "./../../Resources/Logo.png";
import Background from "./../../Resources/Background.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Typewriter from "typewriter-effect";

const client_id = "7de6fc918ba248768d83e1ed282527c6";
const redirect_uri = "http://localhost:5555/callback";
const scope = "user-read-private user-read-email user-library-read user-library-modify playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";


export default function Login() {
  const handleLogin = async () => {
    const authUrl = `http://localhost:5555/loginuser`;
    window.location.href = authUrl;
  };

  return (
    <div
      style={{
        backgroundImage: `url("${Background}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="d-flex flex-column align-items-center"
        style={{
          backgroundColor: "rgba(230, 250, 235, 0.5)",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: 200,
            height: 200,
            borderRadius: 99,
            objectFit: "contain",
          }}
        />
        <div
          style={{
            fontSize: 17,
            fontFamily: "montserrat",
            marginTop: 15,
            color: "black",
          }}
        >
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 70,
              strings: ["Create personalized mood-based playlist"],
            }}
          />
        </div>
        <button
          className="btn btn-success btn-lg throbbing-button"
          onClick={handleLogin}
          style={{
            padding: 16,
            borderRadius: 99,
            marginTop: 30,
          }}
        >
          Login With Spotify
        </button>
      </Container>
    </div>
  );
}
