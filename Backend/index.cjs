const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const querystring = require("querystring");
const axios = require("axios");
const path = require("path");

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

app.get("/callback", async (req, res) => {
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
