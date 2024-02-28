import React from 'react';
import { Container } from 'react-bootstrap';
import Logo from './../../Resources/Logo.png'

export default function Login() {
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
                    backgroundColor: "#333", // Optional, can be removed
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
                <a className="btn btn-success btn-lg" href='/login' style={{
                    padding: 16,
                    borderRadius: 99,
                    marginTop: 30
                }}>
                    Login With Spotify
                </a>
            </Container>
        </div>
    )
}
