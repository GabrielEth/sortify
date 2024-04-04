const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");
const axios = require("axios");

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const routes = require('./models/songandplaylistroutes.cjs');
app.use('/api', routes);

var client_id = "7de6fc918ba248768d83e1ed282527c6";
var client_secret = "2e214f3d12904dd7ae816282230cb72b";
var redirect_uri = "http://localhost:5555/callback";


var stateKey = "spotify_auth_state";

const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

app.get('/loginuser', function(req, res) {

  var state = generateRandomString(16);
  scope = "user-read-private user-read-email user-library-read user-library-modify playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get("/callback", express.urlencoded({ extended: true }), async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  } else {
    const authOptions = {
      method: 'post',
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    };

    try {
      const response = await axios(authOptions);
      const { access_token, refresh_token } = response.data;

      var queryParams = querystring.stringify({
        access_token,
        refresh_token,
      });
      
      res.redirect(`http://localhost:5173/callback?${queryParams}`);
    } catch (error) {
      res.redirect(`http://localhost:5173/error?message=${encodeURIComponent(error.message)}`);
    }
  }
});

app.get('/refresh_token', express.urlencoded({ extended: true }), async (req, res) => {
  const { refreshToken} = req.body;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to refresh token', details: data });
  }

  res.json({
    access_token: data.access_token,
  });
});

import("./config.js").then(({ PORT, mongoDBURL }) => {
  mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log(`App connected to database`);
      app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
