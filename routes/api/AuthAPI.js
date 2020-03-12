const express = require("express");
const router = express.Router();
const ErrorMessage = "Error";
const axios = require("axios");

router.post("/login", async (req, res) => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const CLIENT_ID = "e9f1e9e4962a75bb1f90";
  const CLIENT_SECRET = "fbb9f446ba5a967f8d47ceed5799a7e6897dd6a4";
  const body = JSON.stringify({
    code: req.body.code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });
  try {
    let githubTokenAnswer = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      config
    );
    temp = githubTokenAnswer.data;
    let access_token = temp.split("=");
    let token = access_token[1].split("&");
    res.json(token[0]);
  } catch (err) {
    console.error(err);
    res.status(404).json(ErrorMessage);
  }
});

module.exports = router;
