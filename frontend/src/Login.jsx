import { Container } from 'react-bootstrap';
import Logo from './../../Resources/Logo.png'; // Import statement kept from original code
import Background from './../../Resources/Background.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import querystring from 'querystring';
import Typewriter from 'typewriter-effect';

const client_id = '20992e27a1c343b69cb1f404a3fe8ad2';
const client_secret = '04dbbead01694ebe8bff95e6e9ebf4f6'; // Add your client secret here
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
        console.log("Login button clicked!");

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

    const appGetCallback = (req, res) => {
        var code = req.query.code || null;
        var state = req.query.state || null;

        if (state === null) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url("${Background}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: "100vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container
                className="d-flex flex-column align-items-center"
                style={{
                    backgroundColor: "rgba(230, 250, 235, 0.5)", // Add a semi-transparent white background for better readability
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
                    color: 'black'
                }}>
                    <hi>
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: true,
                                delay: 70,
                                strings: ["Create personalized mood-based playlist"]
                            }}
                        />
                    </hi>
                </div>
                <button className="btn btn-success btn-lg throbbing-button" onClick={handleLogin} style={{
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
