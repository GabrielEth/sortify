import { Container } from 'react-bootstrap';
import Logo from './../../Resources/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const client_id = '20992e27a1c343b69cb1f404a3fe8ad2';
// const client_secret = '04dbbead01694ebe8bff95e6e9ebf4f6'; // Add your client secret here
const redirect_uri = 'http://localhost:5173/callback';
const scope = 'user-read-private user-read-email';

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export default function Login() {
    const handleLogin = () => {

        const state = generateRandomString(16);
        const queryParams = new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });
        const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
        window.location.href = authUrl;
    };

    return (
        <div
            style={{
                backgroundColor: "#333",
                minHeight: "100vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container
                className="d-flex flex-column align-items-center"
                style={{
                    backgroundColor: "#333",
                    padding: '30px',
                    borderRadius: '10px',
                    textAlign: 'center',
                }}
            >
                <img src={Logo} alt="Logo" style={{
                    width: 200,
                    height: 200,
                    borderRadius: 99,
                    objectFit: 'contain'
                }} />
                <div style={{
                    fontSize: 17,
                    fontFamily: 'montserrat',
                    marginTop: 15,
                    color: 'white'
                }}>Create personalized mood-based playlist
                </div>
                <button className="btn btn-success btn-lg" onClick={handleLogin} style={{
                    padding: 16,
                    borderRadius: 99,
                    marginTop: 30
                }}>
                    Login With Spotify
                </button>
            </Container>
        </div>
    )
}
